import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { axiosFastApiInstance } from '@/services/api/axiosfastapiinstance';

export async function POST(request: NextRequest) {
  try {
    const { leadIds, agentId } = await request.json();

    if (!leadIds || !Array.isArray(leadIds) || leadIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Lead IDs array is required' },
        { status: 400 }
      );
    }

    // Get leads from database
    const leads = await prisma.lead.findMany({
      where: { id: { in: leadIds } },
      include: {
        organization: true,
        summary: true,
      },
    });

    if (leads.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid leads found' },
        { status: 404 }
      );
    }

    let successCount = 0;
    let failedCount = 0;
    const results = [];

    // Process calls in batches to avoid overwhelming the system
    const batchSize = 5;
    for (let i = 0; i < leads.length; i += batchSize) {
      const batch = leads.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (lead) => {
        try {
          // Get or create agent for this lead
          let agent;
          if (agentId) {
            agent = await prisma.agent.findUnique({
              where: { id: agentId },
            });
          } else {
            agent = await prisma.agent.findFirst({
              where: { organizationId: lead.organizationId },
            });
            
            if (!agent) {
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
            throw new Error('No agent found or could be created');
          }

          // Create call record
          const call = await prisma.call.create({
            data: {
              leadId: lead.id,
              agentId: agent.id,
              status: 'INITIATED',
              result: { status: 'initiated', timestamp: new Date().toISOString() },
            },
          });

          // Prepare FastAPI payload
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

          // Update call record
          await prisma.call.update({
            where: { id: call.id },
            data: {
              status: 'IN_PROGRESS',
              twilioSid: fastApiResponse.data.sid,
              sessionId: fastApiResponse.data.session_id,
              result: {
                ...(call.result as object || {}),
                twilio_sid: fastApiResponse.data.sid,
                session_id: fastApiResponse.data.session_id,
                status: 'in_progress',
              },
            },
          });

          successCount++;
          return {
            leadId: lead.id,
            callId: call.id,
            success: true,
            twilioSid: fastApiResponse.data.sid,
            sessionId: fastApiResponse.data.session_id,
          };

        } catch (error) {
          failedCount++;
          console.error(`Failed to call lead ${lead.id}:`, error);
          return {
            leadId: lead.id,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Add delay between batches to avoid rate limiting
      if (i + batchSize < leads.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    revalidatePath('/leads');

    return NextResponse.json({
      success: true,
      total: leadIds.length,
      successCount,
      failedCount,
      results,
    });

  } catch (error) {
    console.error('Bulk call error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to initiate bulk calls' 
      },
      { status: 500 }
    );
  }
}
