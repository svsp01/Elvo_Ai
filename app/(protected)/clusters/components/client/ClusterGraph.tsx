'use client'

import { useCallback, useMemo } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  EdgeChange,
  NodeChange
} from 'reactflow'
import 'reactflow/dist/style.css'
import { ClusterNode } from './ClusterNode'
import { ClusterNodeData, LeadWithRelations, ClusterWithRelations } from '../../types'

type ClusterNodeType = Node<ClusterNodeData>

interface ClusterGraphProps {
  initialLeads: LeadWithRelations[]
  initialClusters: ClusterWithRelations[]
}

const nodeTypes = {
  cluster: ClusterNode
}

export function ClusterGraph({ initialLeads, initialClusters }: ClusterGraphProps) {
  const initialNodes: ClusterNodeType[] = useMemo(() => {
    return initialLeads.map((lead) => ({
      id: lead.id,
      type: 'cluster',
      position: { x: Math.random() * 800, y: Math.random() * 600 },
      data: {
        lead,
        keywords: lead.keywords,
        summary: lead.summary
      }
    }))
  }, [initialLeads])

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = []
    initialLeads.forEach((lead) => {
      lead.keywords.forEach((keyword) => {
        const relatedLeads = initialLeads.filter(
          (l) => l.id !== lead.id && l.keywords.some((k) => k.id === keyword.id)
        )
        relatedLeads.forEach((relatedLead) => {
          edges.push({
            id: `${lead.id}-${relatedLead.id}`,
            source: lead.id,
            target: relatedLead.id,
            animated: true
          })
        })
      })
    })
    return edges
  }, [initialLeads])

  const [nodes, setNodes, onNodesChange] = useNodesState<ClusterNodeData>(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds))
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}