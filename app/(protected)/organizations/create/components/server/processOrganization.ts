'use server';

import { organizationService } from '@/services/organizationService';

interface OrganizationData {
  name: string;
  description: string;
}

export default async function processOrganization(data: OrganizationData) {
  try {
    const organization = await organizationService.create(data);
    return organization;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unexpected error occurred');
  }
}