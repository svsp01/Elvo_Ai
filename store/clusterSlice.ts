import { ClusterWithRelations, LeadWithRelations } from '@/app/(protected)/clusters/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface ClusterState {
  leads: LeadWithRelations[]
  clusters: ClusterWithRelations[]
  isSearchActive: boolean
}

const initialState: ClusterState = {
  leads: [],
  clusters: [],
  isSearchActive: false
}

export const clusterSlice = createSlice({
  name: 'cluster',
  initialState,
  reducers: {
    setLeads: (state:any, action: PayloadAction<LeadWithRelations[]>) => {
      state.leads = action.payload.map(lead => ({
        ...lead,
        createdAt: lead?.createdAt?.toISOString(),
        updatedAt: lead?.updatedAt?.toISOString()
      }))
      state.isSearchActive = true
    },
    setSearchActive: (state, action: PayloadAction<boolean>) => {
      state.isSearchActive = action.payload
    },
    resetToInitial: (state:any, action: PayloadAction<LeadWithRelations[]>) => {
      state.leads = action.payload.map(lead => ({
        ...lead,
        createdAt: lead?.createdAt?.toISOString(),
        updatedAt: lead?.updatedAt?.toISOString
      }))
      state.isSearchActive = false
    }
  }
})

export const { setLeads, setSearchActive, resetToInitial } = clusterSlice.actions
export default clusterSlice.reducer