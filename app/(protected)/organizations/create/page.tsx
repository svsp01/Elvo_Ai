import { Suspense } from "react";
import OrganizationForm from "./components/client/OrganizationForm";

export default function CreateOrganizationPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <OrganizationForm />
    </Suspense>
  );
}
