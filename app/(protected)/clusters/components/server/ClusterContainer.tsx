import { prisma } from '@/lib/prisma'
import { ClusterGraph } from '../client/ClusterGraph'

export async function ClusterContainer() {
  const leads = await prisma.lead.findMany({
    include: {
      keywords: true,
      cluster: true,
      summary: true
    }
  })

  const clusters = await prisma.cluster.findMany({
    include: {
      keywords: true
    }
  })

  return (
    <div className="w-full h-[80vh] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-xl">
      <ClusterGraph initialLeads={leads} initialClusters={clusters} />
    </div>
  )
}