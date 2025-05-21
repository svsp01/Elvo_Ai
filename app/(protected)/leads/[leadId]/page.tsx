import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CallButton from "./components/client/CallButton";
import LeadDetails from "./components/server/LeadDetails";
import CallHistory from "./components/server/CallHistory";
import OrganizationSelect from "./components/OrganizationSelect";

interface PageProps {
  params: Promise<{ leadId: string }>;
}

export default async function LeadDetailPage({ params }: PageProps) {
  const session = await auth();
  const { leadId } = await params;

  console.log("Debug: Session user:", session?.user); // Debug session
  if (!session?.user) {
    console.log("Debug: No user session, redirecting to /login");
    redirect("/login");
    return null;
  }

  console.log("Debug: Lead ID:", leadId); // Debug leadId
  if (!leadId) {
    console.log("Debug: No leadId provided, triggering notFound");
    notFound();
  }

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

  console.log("Debug: Lead data:", lead); // Debug lead query result
  if (!lead) {
    console.log("Debug: Lead not found for leadId:", leadId);
    notFound();
  }

  const hasAccess = await prisma.organization.findFirst({
    where: {
      // id: lead.organizationId || "",
      ownerId: session.user.id,
    },
  });

  console.log("Debug: Has access:", hasAccess, "User role:", session.user.role); // Debug access and role
  // if ((lead.organizationId && !hasAccess) || session.user.role === "GUEST") {
  //   console.log(
  //     "Debug: Access denied. Organization ID:",
  //     lead.organizationId,
  //     "Has access:",
  //     hasAccess,
  //     "User role:",
  //     session.user.role
  //   );
  //   notFound();
  // }

  const organizations = await prisma.organization.findMany({
    where: { ownerId: session.user.id },
    select: { id: true, name: true },
  });

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl">{lead.phoneNumber}</CardTitle>
          <CallButton phoneNumber={lead.phoneNumber} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <LeadDetails
              lead={{
                phoneNumber: lead.phoneNumber,
                email: lead.email,
                public: lead.public || false,
                createdAt: lead.createdAt,
                data: lead.data,
                summary: lead.summary?.text,
                keywords: lead.keywords.map((k) => k.value),
                cluster: lead.cluster?.name,
                publicSearch: lead.publicSearch?.keywords,
              }}
            />
            <div>
              <h3 className="font-semibold">Organization</h3>
              <div className="mt-2">
                <OrganizationSelect
                  leadId={lead.id}
                  organizations={organizations}
                  currentOrganizationId={lead.organizationId}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <CallHistory calls={lead.calls} />
    </div>
  );
}