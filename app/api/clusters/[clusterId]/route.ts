import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request, { params }: { params: { clusterId: string } }) {
  try {
    const cluster = await prisma.cluster.findUnique({
      where: { id: params.clusterId },
      include: {
        leads: {
          include: {
            keywords: true,
            summary: true
          }
        },
        keywords: true
      }
    })

    if (!cluster) {
      return NextResponse.json({ error: 'Cluster not found' }, { status: 404 })
    }

    return NextResponse.json(cluster)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cluster' }, { status: 500 })
  }
}