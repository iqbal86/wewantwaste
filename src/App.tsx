import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ApiProvider from './contexts/ApiProvider'
import SkipSelectionContainer from './pages/SkipSelectionContainer'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache is kept for 30 minutes
      retry: 2, // Retry failed requests 2 times
      refetchOnWindowFocus: true, // Refetch when window regains focus
      refetchOnMount: true, // Refetch when component mounts
      refetchOnReconnect: true, // Refetch when network reconnects
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ApiProvider>
        <SkipSelectionContainer />
      </ApiProvider>
    </QueryClientProvider>
  )
}

export default App
