import { useQuery } from '@tanstack/react-query'
import { useApiContext } from '../contexts/ApiProvider'
import { useState } from 'react'

export const useFetchSkips = (postcode: string, area: string) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { fetchSkips } = useApiContext()

  const query = useQuery({
    queryKey: ['skips', postcode, area],
    queryFn: () => fetchSkips(postcode, area),
    staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
    gcTime: 1000 * 60 * 30, // Cache is kept for 30 minutes
    retry: 2, // Retry failed requests 2 times
    refetchOnWindowFocus: true, // Refetch when window regains focus
    refetchOnMount: true, // Refetch when component mounts
    refetchOnReconnect: true, // Refetch when network reconnects
    // Prefetch the next page of data
    placeholderData: (previousData) => previousData,
  })

  const selectedSkip = query.data?.find(
    (skip) => skip.id === Number(selectedId),
  )

  return {
    ...query,
    selectedId,
    setSelectedId,
    selectedSkip,
  }
}
