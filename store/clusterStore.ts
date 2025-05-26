import { ClusterWithRelations, LeadWithRelations } from '@/app/(protected)/clusters/types'
import { create } from 'zustand'

interface ClusterState {
  leads: LeadWithRelations[]
  clusters: ClusterWithRelations[]
  isSearchActive: boolean
  setLeads: (leads: LeadWithRelations[]) => void
  setSearchActive: (active: boolean) => void
  resetToInitial: (initialLeads: LeadWithRelations[]) => void
}

export const useClusterStore = create<ClusterState>((set) => ({
  leads: [],
  clusters: [],
  isSearchActive: false,
  setLeads: (leads) => set({ leads, isSearchActive: true }),
  setSearchActive: (active) => set({ isSearchActive: active }),
  resetToInitial: (initialLeads) => set({ leads: initialLeads, isSearchActive: false })
}))