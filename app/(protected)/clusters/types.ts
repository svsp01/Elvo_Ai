import { Lead, Cluster, Keyword, Summary } from '@prisma/client'

export interface LeadWithRelations extends Lead {
  keywords: Keyword[]
  summary: Summary | null
  cluster: Cluster | null
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