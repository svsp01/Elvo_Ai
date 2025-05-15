import { PrismaClient } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { SearchBar } from "./components/SearchBar";
import SignOutButton from "@/components/auth/sign-out";

const prisma = new PrismaClient();

export default async function DashboardPage() {
  // Verify auth is a function
  if (typeof auth !== "function") {
    console.error("Auth is not a function:", auth);
    throw new Error("Authentication setup error");
  }

  const session = await auth();
  console.log("DashboardPage session:", JSON.stringify(session, null, 2));

  if (!session?.user) {
    redirect("/login");
    return null;
  }

  // Fetch user's organizations
  const organizations = await prisma.organization.findMany({
    where: { ownerId: session.user.id },
    select: { id: true, name: true, slug: true, isVerified: true },
  });

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchBar/>
        </Suspense>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Welcome, {session.user.name || session.user.email || "Guest"}!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              You are logged in as a {session.user.role} user.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Your Details</h3>
              <p>Email: {session.user.email}</p>
              <p>Role: {session.user.role}</p>
            </div>
            {organizations.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">Your Organizations</h3>
                <ul className="list-disc pl-5">
                  {organizations.map((org) => (
                    <li key={org.id}>
                      {org.name} ({org.slug})
                      {org.isVerified ? " ✅ Verified" : " ⏳ Unverified"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="rounded-md bg-gray-50 p-4">
              <h3 className="font-semibold">Session Information</h3>
              <pre className="mt-2 max-h-96 overflow-auto text-sm">
                {JSON.stringify(session, null, 2)}
              </pre>
            </div>
            <SignOutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}