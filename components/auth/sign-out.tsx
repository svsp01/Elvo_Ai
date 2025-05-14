// components/auth/sign-out.tsx
"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const data = await signOut({ redirect: false, callbackUrl: "/login" });
      router.replace(data.url || "/login"); // Navigate to the returned URL or fallback to "/"
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}