import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function OrganizationsPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
    return null;
  }

  // Fetch user's organizations
  const organizations = await prisma.organization.findMany({
    where: { ownerId: session.user.id },
    select: { 
      id: true, 
      name: true, 
      description: true, 
      ownerId: true,
      leads: true,
      agents: true,
      owner: true,
      updatedAt : true,
      isVerified: true,
      createdAt: true
    },
  });
  
  console.log("User's organizations:", organizations);

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Organizations</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Link href={`/organizations/${org.id}`} key={org.id}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle>{org.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                  <p>Slug: {org.description}</p>
                  <p>Created: {new Date(org.createdAt).toLocaleDateString()}</p>
                  <p>Status: {org.isVerified ? "Verified" : "Pending Verification"}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}