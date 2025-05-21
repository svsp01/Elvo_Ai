import axiosInstance from "./api/axiosInstance";

export interface Organization {
  id: string;
  name: string;
  description: string;
  isVerified: boolean;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationCreateData {
  name: string;
  description: string;
}

export interface OrganizationUpdateData {
  name?: string;
}

export const organizationService = {
  getAll: async () => {
    const response = await axiosInstance.get<Organization[]>('/organizations');
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await axiosInstance.get<Organization>(`/organizations/${slug}`);
    return response.data;
  },

  create: async (data: OrganizationCreateData) => {
    const response = await axiosInstance.post<Organization>('/organizations', data);
    return response.data;
  },

  update: async (slug: string, data: OrganizationUpdateData) => {
    const response = await axiosInstance.patch<Organization>(`/organizations/${slug}`, data);
    return response.data;
  },

  delete: async (slug: string) => {
    await axiosInstance.delete(`/organizations/${slug}`);
  },
};