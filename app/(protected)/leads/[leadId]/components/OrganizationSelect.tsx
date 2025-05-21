"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Organization {
  id: string;
  name: string;
}

interface OrganizationSelectProps {
  leadId: string;
  organizations: Organization[];
  currentOrganizationId: string | null;
}

export default function OrganizationSelect({ leadId, organizations, currentOrganizationId }: OrganizationSelectProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleOrganizationChange = async (organizationId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ organizationId })
      });

      if (!response.ok) throw new Error('Failed to update organization');
      
      router.refresh();
    } catch (error) {
      console.error('Error updating organization:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      disabled={loading}
      value={currentOrganizationId || undefined}
      onValueChange={handleOrganizationChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select organization" />
      </SelectTrigger>
      <SelectContent>
        {organizations.map((org) => (
          <SelectItem key={org.id} value={org.id}>
            {org.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}