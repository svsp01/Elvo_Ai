import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: Promise<{ callerId: string }>;
}

export default async function AgentDetailPage({ params }: PageProps) {
  const session = await auth();
  const { callerId } = await params;

  if (!session?.user) {
    redirect("/login");
    return null;
  }

  if (!callerId) {
    notFound();
  }

  const agent = await prisma.agent.findUnique({
    where: { id: callerId },
    include: {
      organization: true,
      createdBy: {
        select: {
          name: true,
          email: true
        }
      },
      calls: {
        include: { lead: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!agent) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">{agent.name}</CardTitle>
          <span className="text-sm text-muted-foreground">{agent.type}</span>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Agent Details</h3>
              <div className="space-y-2 mt-2">
                <p><span className="font-medium">Voice:</span> {agent.voice || "Default"}</p>
                <p><span className="font-medium">Organization:</span> {agent.organization?.name || "Unassigned"}</p>
                <p><span className="font-medium">Created by:</span> {agent.createdBy?.name || agent.createdBy?.email || "System"}</p>
                <p><span className="font-medium">Created:</span> {new Date(agent.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Statistics</h3>
              <div className="space-y-2 mt-2">
                <p><span className="font-medium">Total Calls:</span> {agent.calls.length}</p>
              </div>
            </div>
          </div>

          {agent.prompt && (
            <div>
              <h3 className="font-semibold">Custom Prompt</h3>
              <p className="mt-2 text-sm">{agent.prompt}</p>
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-4">Recent Calls</h3>
            <div className="space-y-2">
              {agent.calls.slice(0, 5).map((call) => (
                <div key={call.id} className="p-2 hover:bg-slate-50 rounded">
                  <p>
                    <span className="font-medium">Lead:</span> {call.lead.phoneNumber}
                    <span className="ml-4 text-sm text-muted-foreground">
                      {new Date(call.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}