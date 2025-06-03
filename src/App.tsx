import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ApiProvider from './contexts/ApiProvider'
import SkipSelectionContainer from './pages/SkipSelectionContainer'

const queryClient = new QueryClient()

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
