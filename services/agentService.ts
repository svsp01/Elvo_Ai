import axiosInstance from "./api/axiosInstance";

export interface Agent {
  id: string;
  name: string;
  type: string;
  voice?: string;
  prompt?: string;
  createdById?: string;
  organizationId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AgentCreateData {
  name: string;
  type: string;
  voice?: string;
  prompt?: string;
  organizationId?: string;
}

export const agentService = {
  create: async (data: AgentCreateData) => {
    const response = await axiosInstance.post<Agent>('/agents', data);
    return response.data;
  },
  getAll: async () => {
    const response = await axiosInstance.get<Agent[]>('/agents');
    return response.data;
  }
};