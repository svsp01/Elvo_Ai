import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { axiosFastApiInstance } from '@/services/api/axiosfastapiinstance';

export async function POST(request: NextRequest) {
  try {
    const { leadId, agentId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { success: false, error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    // Get lead details from database
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        organization: true,
        summary: true,
      },
    });

    if (!lead) {
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Get agent details (use default if not provided)
    let agent;
    if (agentId) {
      agent = await prisma.agent.findUnique({
        where: { id: agentId },
      });
    } else {
      // Get default agent for the organization or create one
      agent = await prisma.agent.findFirst({
        where: { organizationId: lead.organizationId },
      });
      
      if (!agent) {
        // Create a default agent
        agent = await prisma.agent.create({
          data: {
            name: 'Default Sales Agent',
            type: 'SALES',
            voice: 'en-IN',
            prompt: 'You are a professional sales agent. Be friendly and helpful.',
            organizationId: lead.organizationId,
          },
        });
      }
    }

    if (!agent) {
      return NextResponse.json(
        { success: false, error: 'Agent not found' },
        { status: 404 }
      );
    }

    // Create call record in database
    const call = await prisma.call.create({
      data: {
        leadId: lead.id,
        agentId: agent.id,
        status: 'INITIATED',
        result: { status: 'initiated', timestamp: new Date().toISOString() },
      },
    });

    // Prepare data for FastAPI
    const fastApiPayload = {
      phone: lead.phoneNumber,
      prompt: agent.prompt || 'You are a sales agent. Be professional and helpful.',
      call_id: call.id,
      lead_data: {
        id: lead.id,
        email: lead.email,
        data: lead.data,
        organization: lead.organization?.name,
      },
    };

    // Call FastAPI backend
    const fastApiResponse = await axiosFastApiInstance.post('/call', fastApiPayload);

    // Update call record with FastAPI response
    await prisma.call.update({
      where: { id: call.id },
      data: {
        status: 'IN_PROGRESS',
        twilioSid: fastApiResponse.data.sid,
        sessionId: fastApiResponse.data.session_id,
        result: {
          ...(call.result as Record<string, any>),
          twilio_sid: fastApiResponse.data.sid,
          session_id: fastApiResponse.data.session_id,
          status: 'in_progress',
        },
      },
    });

    revalidatePath('/leads');

    return NextResponse.json({
      success: true,
      callId: call.id,
      twilioSid: fastApiResponse.data.sid,
      sessionId: fastApiResponse.data.session_id,
    });

  } catch (error) {
    console.error('Call initiation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to initiate call' 
      },
      { status: 500 }
    );
  }
}
