import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Import the Prisma client

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
    const newLead = await prisma.lead.create({
      data: leadData,
    });
    return NextResponse.json(newLead, { status: 201 });
  } catch (error) {
    console.error('Error creating lead:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}
