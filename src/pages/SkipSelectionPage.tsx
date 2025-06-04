import { Typography, Grid } from '@mui/material'
import SkipCard from '../components/SkipCard'
import OrderProgressBar from '../components/OrderProgressBar'
import { SkipApiResponseWithImageUrl } from '../types/types'

const styles = {
  container: {
    p: 3,
    pb: { xs: 10, md: 3 },
  },
}

type SkipSelectionPageProps = {
  skips: SkipApiResponseWithImageUrl[]
  selectedId: string | null
  setSelectedId: (id: string) => void
  selectedSkip: SkipApiResponseWithImageUrl | undefined
  onContinue: () => void
}

const SkipSelectionPage = ({
  skips,
  selectedId,
  setSelectedId,
  selectedSkip,
  onContinue,
}: SkipSelectionPageProps) => (
  <Grid container spacing={3} sx={styles.container}>
    <OrderProgressBar currentStep={2} />
    <Grid item xs={12}>
      <Typography variant="h4" gutterBottom>
        Select Your Skip
      </Typography>
    </Grid>
    {skips.map((skip) => (
      <Grid item xs={12} sm={6} md={4} key={skip.id}>
        <SkipCard
          skip={skip}
          selected={selectedId === String(skip.id)}
          onSelect={() =>
            setSelectedId(selectedId === String(skip.id) ? '' : String(skip.id))
          }
        />
      </Grid>
    ))}
  </Grid>
)

export default SkipSelectionPage
