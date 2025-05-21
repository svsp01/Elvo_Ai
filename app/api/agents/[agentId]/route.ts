import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// GET /api/agents/[agentId]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ agentId: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { agentId } = await params; // Resolve the Promise to get agentId

    const agent = await prisma.agent.findUnique({
      where: { id: agentId }, // Use agentId directly (string)
      include: {
        organization: true,
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
        calls: {
          include: { lead: true },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!agent) {
      return NextResponse.json({ error: "Agent not found" }, { status: 404 });
    }

    return NextResponse.json(agent);
  } catch (error) {
    console.error("Error fetching agent:", error);
    return NextResponse.json(
      { error: "Failed to fetch agent" },
      { status: 500 }
    );
  }
}

// Ensure the route is dynamic (not cached)
export const dynamic = "force-dynamic";