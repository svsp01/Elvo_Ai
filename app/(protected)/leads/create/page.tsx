import { Suspense } from "react";
import LeadInputForm from "./components/client/LeadInputForm";
import LeadsCreationPage from "./components/client/LeadsCreationPage";
import { Toaster } from "@/components/ui/sonner"

export default function CreateLeadPage() {
  return (
    <div className="p-2 ">
      <Suspense fallback={<p>Loading...</p>}>
        {/* <LeadInputForm /> */}
        <LeadsCreationPage />
                <Toaster />

      </Suspense>
    </div>
  );
}
