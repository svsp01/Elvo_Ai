import { Suspense } from 'react'
import LoadingAnimation from '@/components/loading/LoadingAnimation'
import { SearchBarWrapper } from './components/client/SearchBarWrapper'
import { ClusterContainerServer } from './components/server/ClusterContainerServer'

export default async function ClustersPage() {
  return (
    <div className="container mx-auto p-4 min-h-screen">
      <div className="mb-8">
        <Suspense fallback={<div>Loading search...</div>}>
          <SearchBarWrapper />
        </Suspense>
      </div>
      <Suspense fallback={<LoadingAnimation />}>
        <ClusterContainerServer />
      </Suspense>
    </div>
  )
}