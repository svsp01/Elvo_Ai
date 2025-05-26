import { prisma } from '@/lib/prisma'
import ClusterContainer from './ClusterContainer'
import { SerializedLeadWithRelations } from '../../types'
import { Lead } from '@prisma/client'

export async function ClusterContainerServer() {
  const leads = await prisma.lead.findMany({
    include: {
      keywords: true,
      cluster: true,
      summary: true,
    },
  })

  const clusters = await prisma.cluster.findMany({
    include: {
      keywords: true,
    },
  })

  

  return (
    <ClusterContainer
      initialLeads={leads}
      initialClusters={clusters}
    />
  )
}
