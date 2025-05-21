import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import the Prisma client
import { Prisma } from '@prisma/client';

// GET route to fetch all leads
export async function GET() {
  try {
    const leads = await prisma.lead.findMany();
    return NextResponse.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}

// POST route to create a new lead
export async function POST(request: NextRequest) {
  try {
    const leadData = await request.json();

    // Ensure the payload contains a phone number
    if (!leadData.phoneNumber) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const newLead = await prisma.lead.create({
      data: {
        phoneNumber: leadData.phoneNumber, // Always include phoneNumber
        data: Prisma.JsonNull, // Using Prisma.JsonNull for JSON fields
        organizationId: leadData.organizationId || undefined, // Include organizationId if it exists, else leave it undefined
      },
    });

    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
