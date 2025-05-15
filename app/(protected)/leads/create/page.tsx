import { Suspense } from "react";
import LeadInputForm from "./components/client/LeadInputForm";

export default function CreateLeadPage() {
  return (
    <main className="p-2 ">
      <Suspense fallback={<p>Loading...</p>}>
        <LeadInputForm />
      </Suspense>
    </main>
  );
}
