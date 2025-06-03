import { useQuery } from '@tanstack/react-query'
import { useApiContext } from '../contexts/ApiProvider'
import { useState } from 'react'

export const useFetchSkips = (postcode: string, area: string) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const { fetchSkips } = useApiContext()

  const query = useQuery({
    queryKey: ['skips', postcode, area],
    queryFn: () => fetchSkips(postcode, area),
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
