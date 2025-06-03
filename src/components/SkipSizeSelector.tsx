import { Grid, Typography, CircularProgress, Box } from '@mui/material'
import { useState } from 'react'
import { useFetchSkips } from '../hooks/useFetchSkips'
import SkipCard from './SkipCard'
import SummaryBar from './SummaryBar'
import { SkipApiResponseWithImageUrl } from '../types/types'

const SkipSizeSelector = () => {
  // For demo, use NR32 and Lowestoft; replace with context/props for real postcode/area
  const { data: skips, isLoading, error } = useFetchSkips('NR32', 'Lowestoft')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedSkip = skips?.find(
    (skip: SkipApiResponseWithImageUrl) => skip.id === Number(selectedId),
  )

  const handleContinue = () => {
    alert(`Continue with skip: ${selectedSkip?.id}`)
  }

  if (isLoading) return <CircularProgress />
  if (error) return <Typography color="error">Failed to load skips.</Typography>

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Pick Your Skip Size
      </Typography>
      <Typography variant="subtitle1" mb={4}>
        Choose the skip size that fits your needs. All prices include a 14-day
        hire period.
      </Typography>
      <Grid container spacing={3}>
        {skips?.map((skip: SkipApiResponseWithImageUrl) => (
          <Grid item xs={12} sm={6} md={4} key={skip.id}>
            <SkipCard
              skip={skip}
              selected={selectedId === skip.id.toString()}
              onSelect={() => setSelectedId(skip.id.toString())}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ height: { xs: 80, md: 0 } }} />{' '}
      {/* Spacer for mobile summary bar */}
      <SummaryBar selectedSkip={selectedSkip} onContinue={handleContinue} />
    </Box>
  )
}

export default SkipSizeSelector
