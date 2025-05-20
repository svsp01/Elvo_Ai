import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AgentList from "./components/server/AgentList";
import Link from "next/link";

export default async function CallersPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
    return null;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">AI Callers</h1>
        <Link
          href="/callers/create"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Create Agent
        </Link>
      </div>
      <AgentList />
    </div>
  );
}