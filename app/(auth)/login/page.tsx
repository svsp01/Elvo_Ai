import AuthCard from "@/components/auth/AuthCard";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
      <Suspense fallback={<div>Loading...</div>}>
        <AuthCard />
      </Suspense>
    </div>
  );
}
