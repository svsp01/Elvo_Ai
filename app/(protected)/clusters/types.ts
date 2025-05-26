import { Lead, Cluster, Keyword, Summary, Prisma } from '@prisma/client'

export interface LeadWithRelations extends Lead {
  keywords: Keyword[]
  summary: Summary | null
  cluster: Cluster | null
}

// Add this new interface for serialized data
export interface SerializedLeadWithRelations extends Omit<LeadWithRelations, 'createdAt' | 'updatedAt'> {
  createdAt: Date | string
  updatedAt: Date | string
}

export interface SearchResponse {
  leads: LeadWithRelations[]
  message: string
}

export interface SearchBarProps {
  onSearchResults: (results: LeadWithRelations[]) => void
}

export interface ClusterWithRelations extends Cluster {
  keywords: Keyword[]
}

export interface ClusterNodeData {
  lead: LeadWithRelations
  keywords: Keyword[]
  summary: Summary | null
}
export interface ClusterNodeData {
  lead: LeadWithRelations
  keywords: Keyword[]
  summary: Summary | null
}


export type LeadsWithRelations = Prisma.LeadGetPayload<{
  include: {
    summary: true;
    organization: true;
    calls: true;
    cluster: true;
    keywords: true;
  };
}>;