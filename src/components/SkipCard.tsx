import { useState } from 'react'
import { Card, Typography, Button, Grid } from '@mui/material'
import ConstructionIcon from '@mui/icons-material/Construction'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import SkipPlacementModal from './SkipPlacementModal'
import { SkipApiResponseWithImageUrl } from '../types/types'
import { CSSProperties } from 'react'

const styles = {
  card: (selected: boolean) => ({
    borderStyle: 'solid',
    borderWidth: '2.5px',
    borderColor: selected ? '#1751F0' : '#e0e0e0',
    borderRadius: 5,
    boxShadow: selected
      ? '0 4px 16px 0 rgba(23,81,240,0.12)'
      : '0 4px 16px 0 rgba(31,38,135,0.08)',
    background: 'rgba(255,255,255,0.75)',
    backdropFilter: 'blur(8px)',
    transition:
      'box-shadow 0.25s, border-color 0.25s, transform 0.18s, z-index 0.18s',
    cursor: 'pointer',
    minHeight: 340,
    minWidth: 260,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    transform: selected ? 'scale(0.97)' : 'none',
    '&:hover': {
      boxShadow: '0 16px 40px 0 rgba(23,81,240,0.25)',
      transform: selected
        ? 'scale(0.97)'
        : {
            xs: 'none',
            md: 'scale(1.035) translateY(-4px)',
          },
      borderColor: '#1751F0',
      zIndex: 10,
    },
    '&:hover .image': {
      filter: 'brightness(0.7) scale(1.04)',
    },
  }),
  accent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 6,
    height: '100%',
    bgcolor: 'linear-gradient(180deg, #1751F0 60%, #5BE9FF 100%)',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    zIndex: 2,
    transition: 'opacity 0.2s',
    opacity: 1,
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
    transition: 'filter 0.3s, transform 0.3s',
  } as CSSProperties,
  badgeLeftWrap: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 6,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    alignItems: 'center',
    maxWidth: { xs: '55%', sm: '60%', md: '65%' },
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    px: 1.5,
    py: 0.5,
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 13,
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    boxShadow: '0 2px 8px #1751F022',
    color: '#fff',
    userSelect: 'none',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    letterSpacing: 0.3,
  },
  badgeHeavy: {
    background: 'linear-gradient(90deg, #2E7D32 60%, #81C784 100%)',
  },
  badgeRoad: {
    background: 'linear-gradient(90deg, #1976D2 60%, #64B5F6 100%)',
  },
  yardBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 5,
    background: 'linear-gradient(90deg, #1751F0 60%, #5BE9FF 100%)',
    color: '#fff',
    fontWeight: 700,
    fontSize: 15,
    px: 1.5,
    py: 0.5,
    borderRadius: 999,
    boxShadow: '0 2px 8px #1751F033',
    letterSpacing: 0.5,
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    userSelect: 'none',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  overlay: (selected: boolean) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    bgcolor: 'rgba(20,30,60,0.55)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: selected ? 1 : 0,
    pointerEvents: selected ? 'auto' : 'none',
    zIndex: 3,
    transition: 'opacity 0.3s',
    p: 3,
    textAlign: 'center',
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  }),
  overlayTitle: {
    fontWeight: 800,
    fontSize: 22,
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    color: '#fff',
    mb: 1,
    textShadow: '0 2px 8px #0008',
  },
  overlayDetails: {
    color: '#e3f0ff',
    fontSize: 16,
    fontWeight: 500,
    mb: 1,
    textShadow: '0 1px 4px #0006',
  },
  overlayPrice: {
    fontWeight: 700,
    color: '#5BE9FF',
    fontSize: 24,
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    letterSpacing: 0.2,
    mb: 1,
    textShadow: '0 1px 4px #0006',
  },
  content: {
    position: 'relative',
    zIndex: 4,
    width: '100%',
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    color: '#fff',
    minHeight: 120,
  },
  title: {
    fontWeight: 800,
    fontSize: 22,
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    color: '#fff',
    mb: 0.5,
    textShadow: '0 2px 8px #0008',
  },
  button: {
    mt: 2,
    px: 4,
    py: 1.2,
    fontWeight: 700,
    fontSize: 18,
    letterSpacing: 0.5,
    borderRadius: 999,
    boxShadow: '0 2px 8px 0 #1751F033',
    background: 'linear-gradient(90deg, #1751F0 60%, #5BE9FF 100%)',
    color: '#fff',
    border: 'none',
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
    transition:
      'background 0.2s, color 0.2s, transform 0.18s, box-shadow 0.18s',
    width: '100%',
    display: 'block',
    mx: 'auto',
    '&:hover': {
      background: 'linear-gradient(90deg, #1751F0 40%, #5BE9FF 100%)',
      color: '#fff',
      transform: 'scale(1.045)',
      boxShadow: '0 4px 16px 0 #1751F044',
    },
  },
  buttonCenter: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}

type SkipCardProps = {
  skip: SkipApiResponseWithImageUrl
  selected: boolean
  onSelect: () => void
}

const SkipCard = ({ skip, selected, onSelect }: SkipCardProps) => {
  const priceExVat = Math.ceil(
    skip.price_before_vat - (Number(skip.price_before_vat) / 100) * skip.vat,
  )

  // Modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [placement, setPlacement] = useState<'private' | 'public'>('private')

  const handleContinue = (e: React.MouseEvent) => {
    e.stopPropagation()
    setModalOpen(true)
  }

  const handleModalClose = () => setModalOpen(false)
  const handleModalContinue = () => {
    setModalOpen(false)
    // You can add further logic here for what happens after continue
  }

  const handleChooseDifferentSkip = () => {
    setModalOpen(false)
    if (selected) onSelect()
  }

  return (
    <Card
      sx={styles.card(selected)}
      onClick={onSelect}
      aria-selected={selected}
      tabIndex={0}
    >
      <Grid container sx={styles.badgeLeftWrap}>
        {skip.allows_heavy_waste && (
          <Grid item sx={{ ...styles.badge, ...styles.badgeHeavy }}>
            <ConstructionIcon sx={{ fontSize: 16 }} /> Heavy Waste
          </Grid>
        )}
        {!skip.allowed_on_road && (
          <Grid item sx={{ ...styles.badge, ...styles.badgeRoad }}>
            <DirectionsCarIcon sx={{ fontSize: 16 }} /> Not On Road
          </Grid>
        )}
      </Grid>
      <Grid item sx={styles.yardBadge}>
        {skip.size} Yard
      </Grid>
      {selected && <Grid sx={styles.accent} />}
      <img
        src={skip.imageUrl}
        alt={skip.size.toString()}
        className="image"
        style={styles.image}
      />
      <Grid
        item
        sx={styles.overlay(selected)}
        className="overlay"
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography sx={styles.overlayTitle}>{skip.size} Yard Skip</Typography>
        <Typography
          sx={styles.overlayDetails}
        >{`${skip.hire_period_days} day hire period`}</Typography>
        <Typography sx={styles.overlayPrice}>£{priceExVat}</Typography>
      </Grid>
      <Grid
        sx={styles.content}
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-end"
      >
        {selected && (
          <Button
            variant="contained"
            sx={styles.button}
            onClick={handleContinue}
          >
            Continue
          </Button>
        )}
      </Grid>
      <SkipPlacementModal
        open={modalOpen}
        onClose={handleModalClose}
        onContinue={handleModalContinue}
        selectedOption={placement}
        setSelectedOption={setPlacement}
        allowedOnRoad={skip.allowed_on_road}
        onChooseDifferentSkip={handleChooseDifferentSkip}
      />
    </Card>
  )
}

export default SkipCard
