import { getLeads } from '@/services/leadService';
import { LeadsTable } from './client/LeadsTable';

interface LeadsTableWrapperProps {
  searchParams: {
    search: string;
    page: string;
  };
}

export async function LeadsTableWrapper({ searchParams }: LeadsTableWrapperProps) {
  const leads = await getLeads({
    search: searchParams.search,
    page: parseInt(searchParams.page),
    pageSize: 50,
  });

  return <LeadsTable initialLeads={leads} />;
}

