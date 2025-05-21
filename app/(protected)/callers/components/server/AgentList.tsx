import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function AgentList() {
  const agents = await prisma.agent.findMany({
    include: {
      organization: true,
      createdBy: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <Link href={`/callers/${agent.id}`} key={agent.id}>
          <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{agent.name}</span>
                <span className="text-sm text-muted-foreground">{agent.type}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Voice:</span> {agent.voice || "Default"}</p>
                <p><span className="font-medium">Organization:</span> {agent.organization?.name || "Unassigned"}</p>
                <p><span className="font-medium">Created by:</span> {agent.createdBy?.name || agent.createdBy?.email || "System"}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}