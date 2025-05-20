import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// Get a single lead
export async function GET(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { leadId } = await params; // Resolve the Promise to get leadId
    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        organization: true,
        calls: {
          include: { agent: true },
          orderBy: { createdAt: "desc" },
        },
        summary: true,
        keywords: true,
        cluster: true,
        publicSearch: true,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Check if user has access to this lead
    const hasAccess = await prisma.organization.findFirst({
      where: {
        id: lead.organizationId || "",
        ownerId: session.user.id,
      },
    });

    if ((lead.organizationId && !hasAccess) || session.user.role === "GUEST") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error("Error fetching lead:", error);
    return NextResponse.json(
      { error: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}

// Update a lead
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { leadId } = await params;
    // Check if user has access to this lead
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { organization: true },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const hasAccess = await prisma.organization.findFirst({
      where: {
        id: existingLead.organizationId || "",
        ownerId: session.user.id,
      },
    });

    if (
      (existingLead.organizationId && !hasAccess) ||
      session.user.role === "GUEST"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        phoneNumber: body.phoneNumber,
        email: body.email,
        public: body.public,
        data: body.data,
        organizationId: body.organizationId,
        clusterId: body.clusterId,
      },
      include: {
        organization: true,
        calls: {
          include: { agent: true },
          orderBy: { createdAt: "desc" },
        },
        summary: true,
        keywords: true,
        cluster: true,
        publicSearch: true,
      },
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

// Delete a lead
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ leadId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { leadId } = await params;
    // Check if user has access to this lead
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: { organization: true },
    });

    if (!existingLead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    const hasAccess = await prisma.organization.findFirst({
      where: {
        id: existingLead.organizationId || "",
        ownerId: session.user.id,
      },
    });

    if (
      (existingLead.organizationId && !hasAccess) ||
      session.user.role === "GUEST"
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await prisma.lead.delete({
      where: { id: leadId },
    });

    return NextResponse.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
