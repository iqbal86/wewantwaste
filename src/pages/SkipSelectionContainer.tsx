import { useFetchSkips } from '../hooks/useFetchSkips'
import { Typography, CircularProgress } from '@mui/material'
import SkipSelectionPage from './SkipSelectionPage'

const SkipSelectionContainer = () => {
  const {
    data: skipsRaw,
    isLoading,
    error,
    selectedId,
    setSelectedId,
    selectedSkip,
  } = useFetchSkips('NR32', 'Lowestoft')

  const handleContinue = () => {
    alert(`Continue with skip: ${selectedSkip?.id}`)
  }

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color="error">Failed to load skips.</Typography>

  return (
    <SkipSelectionPage
      skips={skipsRaw || []}
      selectedId={selectedId}
      setSelectedId={setSelectedId}
      selectedSkip={selectedSkip}
      onContinue={handleContinue}
    />
  )
}

export default SkipSelectionContainer
