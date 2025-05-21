import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrganizationDetailsPage({ params }: PageProps) {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
    return null;
  }

  // Await the params before accessing its properties
  const { id } = await params;

  const organization = await prisma.organization.findUnique({
    where: { 
      id,
      ownerId: session.user.id // Ensure user can only view their own organizations
    },
    include: {
      leads: true,
      agents: true,
      owner: {
        select: {
          name: true,
          email: true
        }
      }
    }
  });

  if (!organization) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{organization.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Organization Details</h3>
              <div className="space-y-2 mt-2">
                <p><span className="font-medium">Slug:</span> {organization.description}</p>
                <p><span className="font-medium">Status:</span> {organization.isVerified ? "Verified" : "Pending Verification"}</p>
                <p><span className="font-medium">Created:</span> {new Date(organization.createdAt).toLocaleDateString()}</p>
                <p><span className="font-medium">Owner:</span> {organization.owner.name || organization.owner.email}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Statistics</h3>
              <div className="space-y-2 mt-2">
                <p><span className="font-medium">Total Leads:</span> {organization.leads.length}</p>
                <p><span className="font-medium">Total Agents:</span> {organization.agents.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {organization.leads.slice(0, 5).map((lead) => (
                <li key={lead.id} className="p-2 hover:bg-slate-50 rounded">
                  {lead.phoneNumber} - {lead.email || 'No email'}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {organization.agents.map((agent) => (
                <li key={agent.id} className="p-2 hover:bg-slate-50 rounded">
                  {agent.name} - {agent.type}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}