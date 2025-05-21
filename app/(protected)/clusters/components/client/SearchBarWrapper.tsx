'use client'

import { useCallback, useEffect, useState } from 'react'
import { SearchBar } from './SearchBar'
import { LeadWithRelations } from '../../types'

export function SearchBarWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearchResults = useCallback((results: LeadWithRelations[]) => {
    window.dispatchEvent(new CustomEvent('cluster-search', { detail: results }))
  }, [])

  if (!mounted) {
    return null
  }

  return <SearchBar onSearchResults={handleSearchResults} />
}