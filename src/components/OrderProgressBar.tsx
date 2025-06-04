import { Grid, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined'

const steps = [
  { label: 'Postcode', icon: LocationOnIcon },
  { label: 'Waste Type', icon: DeleteOutlineIcon },
  { label: 'Select Skip', icon: LocalShippingIcon },
  { label: 'Permit Check', icon: ShieldOutlinedIcon },
  { label: 'Choose Date', icon: CalendarMonthOutlinedIcon },
  { label: 'Payment', icon: CreditCardOutlinedIcon },
]

const styles = {
  root: {
    width: '100%',
    backdropFilter: 'blur(8px)',
    background: 'rgba(255,255,255,0.7)',
    borderRadius: 4,
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    py: { xs: 2, sm: 3 },
    px: { xs: 0.5, sm: 2 },
    display: 'flex',
    justifyContent: 'center',
    margin: '0 0 0 15px',
    overflowX: { xs: 'auto', sm: 'visible' },
    mt: 2,
    mb: 4,
  },
  step: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: 0.5, sm: 1 },
    minWidth: { xs: 90, sm: 120 },
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'transform 0.18s',
    '&:hover': {
      transform: 'translateY(-2px) scale(1.04)',
      filter: 'brightness(1.08)',
    },
  },
  iconWrapper: (active: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: active
      ? 'linear-gradient(135deg, #1751F0 60%, #5BE9FF 100%)'
      : 'rgba(0,0,0,0.07)',
    boxShadow: active ? '0 2px 8px 0 rgba(23,81,240,0.18)' : 'none',
    transition: 'background 0.3s, box-shadow 0.3s',
  }),
  icon: (active: boolean) => ({
    color: active ? '#fff' : '#1751F0',
    fontSize: { xs: 20, sm: 26 },
    transition: 'color 0.2s',
  }),
  label: (active: boolean) => ({
    color: active ? '#1751F0' : 'rgba(0,0,0,0.38)',
    fontWeight: active ? 700 : 500,
    fontSize: { xs: 13, sm: 16 },
    letterSpacing: 0.2,
    transition: 'color 0.2s',
    whiteSpace: 'nowrap',
    ml: 1,
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    textShadow: active ? '0 1px 4px #5BE9FF33' : 'none',
  }),
  connector: (active: boolean) => ({
    height: 4,
    width: { xs: 24, sm: 48 },
    bgcolor: active
      ? 'linear-gradient(90deg, #1751F0 60%, #5BE9FF 100%)'
      : 'rgba(0,0,0,0.10)',
    mx: { xs: 0.5, sm: 1.5 },
    borderRadius: 2,
    transition: 'background 0.3s',
    flexShrink: 0,
    backgroundImage: active
      ? 'linear-gradient(90deg, #1751F0 60%, #5BE9FF 100%)'
      : 'none',
  }),
}

type OrderProgressBarProps = {
  currentStep: number
}

const OrderProgressBar = ({ currentStep }: OrderProgressBarProps) => {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="center"
      wrap="wrap"
      sx={styles.root}
    >
      {steps.map((step, idx) => {
        const Icon = step.icon
        const active = idx === currentStep
        return (
          <Grid item key={step.label} sx={styles.step}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ ...styles.iconWrapper(active) }}>
                <Icon sx={styles.icon(active)} />
              </span>
              <Typography sx={styles.label(active)}>{step.label}</Typography>
            </span>
            {idx < steps.length - 1 && (
              <Grid item sx={styles.connector(idx < currentStep)} />
            )}
          </Grid>
        )
      })}
    </Grid>
  )
}

export default OrderProgressBar
