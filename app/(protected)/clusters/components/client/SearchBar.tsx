'use client'

import { useCallback, useEffect, useState } from 'react'
import { Command, CommandInput, CommandList, CommandEmpty } from '@/components/ui/command'
import { useRouter } from 'next/navigation'
import { clusterService } from '@/services/clusterService'
import { Loader2 } from 'lucide-react'
import { SearchBarProps, LeadWithRelations, SearchResponse } from '../../types'
import { useDebounce } from '@/hooks/useDebounce'

export function SearchBar({ onSearchResults }: SearchBarProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<LeadWithRelations[]>([])
  const [message, setMessage] = useState('')
  
  const debouncedSearch = useDebounce(searchQuery, 300)

  const handleSearch = async (query: string) => {
    if (!query) {
      setResults([])
      setMessage('')
      onSearchResults([])
      return
    }
    
    setIsLoading(true)
    try {
      const response: SearchResponse = await clusterService.searchClusters(query)
      setResults(response.leads)
      setMessage(response.message)
      onSearchResults(response.leads)
    } catch (error) {
      console.error('Search failed:', error)
      setResults([])
      setMessage('Search failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleSearch(debouncedSearch)
  }, [debouncedSearch])

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      document.getElementById('searchInput')?.focus()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown])

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Command className="rounded-lg border shadow-md">
        <div className="flex items-center border-b px-3">
          <CommandInput
            id="searchInput"
            value={searchQuery}
            onValueChange={(e) => setSearchQuery(e)}
            placeholder="Search leads and clusters (Ctrl + K)"
            className="h-12"
          />
          {isLoading && (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin opacity-50" />
          )}
        </div>
        <CommandList className="max-h-[300px] overflow-y-auto">
          {message ? (
            <CommandEmpty>{message}</CommandEmpty>
          ) : (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </Command>
    </div>
  )
}