import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { axiosFastApiInstance } from '@/services/api/axiosfastapiinstance';

export async function POST(request: NextRequest) {
  console.log('📨 Received POST request on /api/calls');

  try {
    const body = await request.json();
    const { leadId, agentId } = body;

    if (!leadId) {
      console.warn('⚠️ Missing leadId in request body:', body);
      return NextResponse.json(
        { success: false, error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    console.log(`🔍 Fetching lead by ID: ${leadId}`);
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        organization: true,
        summary: true,
      },
    });

    if (!lead) {
      console.warn(`❌ Lead not found: ${leadId}`);
      return NextResponse.json(
        { success: false, error: 'Lead not found' },
        { status: 404 }
      );
    }

    let agent;
    if (agentId) {
      console.log(`🔍 Fetching agent by ID: ${agentId}`);
      agent = await prisma.agent.findUnique({ where: { id: agentId } });
    } else {
      console.log('🧠 Fetching default agent for organization:', lead.organizationId);
      agent = await prisma.agent.findFirst({ where: { organizationId: lead.organizationId } });

      if (!agent) {
        console.log('⚙️ No agent found, creating default sales agent...');
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
      console.error('❌ Agent not found or created');
      return NextResponse.json(
        { success: false, error: 'Agent not found' },
        { status: 404 }
      );
    }

    console.log('📞 Creating initial call record...');
    const call = await prisma.call.create({
      data: {
        leadId: lead.id,
        agentId: agent.id,
        status: 'INITIATED',
        result: {
          status: 'initiated',
          timestamp: new Date().toISOString(),
        },
      },
    });

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

    console.log('🚀 Sending payload to FastAPI backend:', fastApiPayload);

    let fastApiResponse;
    try {
      fastApiResponse = await axiosFastApiInstance.post('/call', fastApiPayload);
      console.log('✅ FastAPI response received:', fastApiResponse.data);
    } catch (axiosError: any) {
      console.error('❌ FastAPI call failed:', axiosError.response?.data || axiosError.message);

      await prisma.call.update({
        where: { id: call.id },
        data: {
          status: 'FAILED',
          result: {
            ...(call.result as Record<string, any>),
            status: 'failed',
            error: axiosError.response?.data || axiosError.message,
          },
        },
      });

      return NextResponse.json(
        { success: false, error: 'Failed to initiate call via backend service' },
        { status: 502 }
      );
    }

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
  } catch (error: any) {
    console.error('🚨 Unexpected error in /api/calls POST:', {
      message: error.message,
      stack: error.stack,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Unexpected server error occurred',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Optional — block unsupported methods clearly
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'GET method not allowed on /api/calls' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, error: 'PUT method not allowed on /api/calls' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, error: 'DELETE method not allowed on /api/calls' },
    { status: 405 }
  );
}
