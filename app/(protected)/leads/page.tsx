import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function LeadsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
    return null;
  }

  // Fetch user's leads
  const leads = await prisma.lead.findMany({
    where: {},
    select: {
      id: true,
      phoneNumber: true,
      email: true,
      data: true,
      public: true,
      organizationId: true,
      organization: {
        select: {
          name: true,
        },
      },
      createdAt: true,
      updatedAt: true,
    },
  });

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Leads</h1>
        <Link
          href="/leads/create"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Create Lead
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leads.map((lead) => (
          <Link href={`/leads/${lead.id}`} key={lead.id}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{lead.phoneNumber}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                  <p>Email: {lead.email || "Not provided"}</p>
                  <p>Organization: {lead.organization?.name || "Unassigned"}</p>
                  <p>
                    Created: {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                  <p>Status: {lead.public ? "Public" : "Private"}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
