import { Grid, Typography, Button } from '@mui/material'
import { SkipApiResponse } from '../types/types'

const styles = {
  container: {
    position: { xs: 'fixed', md: 'static' },
    bottom: 0,
    left: 0,
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 3,
    p: 2,
    zIndex: 1200,
  },
}

type SummaryBarProps = {
  selectedSkip: SkipApiResponse | undefined
  onContinue: () => void
}

const SummaryBar = ({ selectedSkip, onContinue }: SummaryBarProps) => (
  <Grid
    container
    sx={styles.container}
    justifyContent="space-between"
    alignItems="center"
  >
    <Grid item>
      <Typography>
        {selectedSkip
          ? `${selectedSkip.size} Yard Skip - £${selectedSkip.price_before_vat}`
          : 'No skip selected'}
      </Typography>
    </Grid>
    <Grid item>
      <Button
        variant="contained"
        color="primary"
        disabled={!selectedSkip}
        onClick={onContinue}
      >
        Continue
      </Button>
    </Grid>
  </Grid>
)

export default SummaryBar
