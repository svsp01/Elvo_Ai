import { auth } from "@/auth"; // Make sure auth is exported from your auth.ts
import SignOut from "@/components/auth/sign-out";

// You can create a client component for a nicer display
// import UserInfoCard from "@/components/UserInfoCard";

export default async function DashboardPage() {
  const session = await auth();
  console.log("DashboardPage session:", JSON.stringify(session, null, 2)); // Add this log

  // TEMPORARILY COMMENT OUT FOR DEBUGGING
  // if (!session?.user) {
  //   redirect("/login"); 
  //   return null; 
  // }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      {session?.user ? (
        <p>Welcome, {session.user.name || session.user.email}!</p>
      ) : (
        <p>No session user found on dashboard page.</p>
      )}
      
      <h2>Your Session Information (if any):</h2>
      <pre style={{ background: "#f0f0f0", padding: "10px", borderRadius: "5px", overflowX: "auto" }}>
        {JSON.stringify(session, null, 2)}
      </pre>
      <SignOut/>
    </div>
  );
}