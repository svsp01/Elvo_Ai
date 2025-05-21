import { Suspense } from 'react'
import { ClusterContainer } from './components/server/ClusterContainer'
import LoadingAnimation from '@/components/loading/LoadingAnimation'
import { SearchBarWrapper } from './components/client/SearchBarWrapper'

export default async function ClustersPage() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="mb-8">
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchBarWrapper />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingAnimation />}>
        <ClusterContainer />
      </Suspense>
    </div>
  )
}