// app/(protected)/leads/page.tsx
import { Suspense } from 'react';
import { LeadsTableWrapper } from './components/LeadsTableWrapper';

interface LeadsPageProps {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function LeadsPage({ searchParams }: LeadsPageProps) {
  const resolvedSearchParams = await searchParams || {};
  const search = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';
  const page = typeof resolvedSearchParams.page === 'string' ? resolvedSearchParams.page : '1';

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Leads Management</h1>
      </div>
      
      <Suspense fallback={<div>Loading leads...</div>}>
        <LeadsTableWrapper searchParams={{ search, page }} />
      </Suspense>
    </div>
  );
}