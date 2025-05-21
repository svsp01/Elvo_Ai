'use client'

import { memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { ClusterNodeData } from '../../types'

export const ClusterNode = memo(({ data }: NodeProps<ClusterNodeData>) => {
  const { lead, keywords, summary } = data

  return (
    <div className="px-4 py-2 shadow-md rounded-xl bg-white border-2 border-gray-200 min-w-[200px]">
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="font-bold text-sm">{lead.email || lead.phoneNumber}</div>
        </div>
        {summary && (
          <div className="text-xs text-gray-500 line-clamp-2">
            {summary.text}
          </div>
        )}
        <div className="flex flex-wrap gap-1">
          {keywords.map((keyword) => (
            <span
              key={keyword.id}
              className="px-2 py-1 text-xs bg-gray-100 rounded-full"
            >
              {keyword.value}
            </span>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
})

ClusterNode.displayName = 'ClusterNode'
