import { Card, CardContent, Typography, Button, Grid } from '@mui/material'
import { SkipApiResponseWithImageUrl } from '../types/types'
import { CSSProperties } from 'react'

const styles = {
  card: (selected: boolean) => ({
    border: selected ? '2px solid #1976d2' : '1px solid #e0e0e0',
    borderRadius: 3,
    boxShadow: selected ? 4 : 1,
    transition: 'box-shadow 0.2s',
    cursor: 'pointer',
    minHeight: 320,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  }),
  imageContainer: {
    p: 2,
    textAlign: 'center',
  },
  image: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'contain',
  } as CSSProperties,
  button: {
    m: 2,
  },
  price: {
    mt: 1,
  },
}

type SkipCardProps = {
  skip: SkipApiResponseWithImageUrl
  selected: boolean
  onSelect: () => void
}

const SkipCard = ({ skip, selected, onSelect }: SkipCardProps) => (
  <Card
    sx={styles.card(selected)}
    onClick={onSelect}
    aria-selected={selected}
    tabIndex={0}
  >
    <Grid container direction="column" sx={{ height: '100%' }}>
      <Grid item sx={styles.imageContainer}>
        <img
          src={skip.imageUrl}
          alt={skip.size.toString()}
          style={styles.image}
        />
      </Grid>
      <Grid item>
        <CardContent>
          <Typography variant="h6" fontWeight="bold">
            {skip.size} Yard Skip
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {skip.hire_period_days} day hire period
          </Typography>
          <Typography variant="body2" color="text.secondary">
            £{skip.price_before_vat}
          </Typography>
          <Typography variant="h5" color="primary" sx={styles.price}>
            £{skip.price_before_vat}
          </Typography>
        </CardContent>
      </Grid>
      <Grid item sx={{ mt: 'auto' }}>
        <Button
          variant={selected ? 'contained' : 'outlined'}
          color="primary"
          sx={styles.button}
          fullWidth
          onClick={onSelect}
        >
          {selected ? 'Selected' : 'Select'}
        </Button>
      </Grid>
    </Grid>
  </Card>
)

export default SkipCard
