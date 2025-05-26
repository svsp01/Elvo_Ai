'use client'

import { useEffect } from 'react'
import { ClusterGraph } from '../client/ClusterGraph'
import { LeadWithRelations, ClusterWithRelations } from '../../types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { resetToInitial } from '@/store/clusterSlice'

interface ClusterContainerProps {
  initialLeads: LeadWithRelations[]
  initialClusters: ClusterWithRelations[]
}

function ClusterContainer({ initialLeads, initialClusters }: ClusterContainerProps) {
  const { leads, isSearchActive } = useAppSelector(state => state.cluster)

  const displayLeads = isSearchActive ? leads : initialLeads

  return (
    <div className="w-full h-[80vh] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-xl">
      <ClusterGraph initialLeads={displayLeads} initialClusters={initialClusters} />
    </div>
  )
}

export default ClusterContainer
// Server component in a separate file
// Create a new file: ClusterContainerServer.tsx