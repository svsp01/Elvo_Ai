import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AgentForm from "./components/client/AgentForm";

export default async function CreateAgentPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/login");
    return null;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create AI Agent</h1>
      </div>
      <AgentForm />
    </div>
  );
}