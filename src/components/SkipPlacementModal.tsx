import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Grid,
  Button,
  useTheme,
  Alert,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface SkipPlacementModalProps {
  open: boolean
  onClose: () => void
  onContinue: () => void
  selectedOption: 'private' | 'public'
  setSelectedOption: (option: 'private' | 'public') => void
  allowedOnRoad: boolean
  onChooseDifferentSkip: () => void
}

const styles = {
  card: (selected: boolean, theme: any) => ({
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: selected
      ? theme.palette.primary.main
      : theme.palette.grey[700],
    borderRadius: 3,
    background: selected
      ? theme.palette.background.paper
      : theme.palette.background.default,
    boxShadow: selected ? `0 0 0 2px ${theme.palette.primary.main}22` : 'none',
    color: selected
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
    p: 3,
    minWidth: 220,
    minHeight: 140,
    cursor: 'pointer',
    opacity: 1,
    transition:
      'border-color 0.2s, box-shadow 0.2s, background 0.2s, opacity 0.2s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 1,
    pointerEvents: 'auto',
  }),
  alert: {
    bgcolor: '#2d1517',
    color: '#ffb4b4',
    border: '1.5px solid #b71c1c',
    borderRadius: 2,
    p: 3,
    fontSize: 16,
    alignItems: 'flex-start',
  },
  chooseSkipBtn: {
    mt: 1,
    fontWeight: 600,
  },
  dialogTitle: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 26,
    mt: 2,
  },
  subtitle: (theme: any) => ({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    mb: 2,
  }),
  actionBtn: {
    minWidth: 120,
    fontWeight: 600,
  },
  backBtn: (theme: any) => ({
    minWidth: 100,
    fontWeight: 600,
    bgcolor: theme.palette.grey[900],
    color: '#fff',
    '&:hover': { bgcolor: theme.palette.grey[800] },
  }),
  alertTitle: {
    fontWeight: 700,
    color: '#ffb4b4',
    mb: 1,
  },
  alertText: {
    color: '#ffb4b4',
    fontSize: 15,
    mb: 2,
  },
}

const SkipPlacementModal = ({
  open,
  onClose,
  onContinue,
  selectedOption,
  setSelectedOption,
  allowedOnRoad,
  onChooseDifferentSkip,
}: SkipPlacementModalProps) => {
  const theme = useTheme()
  const showRoadAlert = !allowedOnRoad && selectedOption === 'public'
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="skip-placement-dialog-title"
      aria-describedby="skip-placement-dialog-description"
    >
      <DialogTitle sx={styles.dialogTitle}>
        Where will the skip be placed?
      </DialogTitle>
      <Typography sx={styles.subtitle(theme)}>
        This helps us determine if you need a permit for your skip
      </Typography>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        sx={{ minHeight: 320 }}
        id="skip-placement-dialog-description"
      >
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction="column"
              sx={styles.card(selectedOption === 'private', theme)}
              onClick={() => setSelectedOption('private')}
            >
              <Grid item>
                <HomeIcon
                  sx={{
                    fontSize: 32,
                    mb: 1,
                    color:
                      selectedOption === 'private'
                        ? theme.palette.primary.main
                        : theme.palette.grey[500],
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color={
                    selectedOption === 'private'
                      ? theme.palette.primary.main
                      : undefined
                  }
                >
                  Private Property
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Driveway or private land
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  No permit required when placed on your private property
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid
              container
              direction="column"
              sx={styles.card(selectedOption === 'public', theme)}
              onClick={() => setSelectedOption('public')}
            >
              <Grid item>
                <LocalShippingIcon
                  sx={{
                    fontSize: 32,
                    mb: 1,
                    color:
                      selectedOption === 'public'
                        ? theme.palette.primary.main
                        : theme.palette.grey[500],
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  color={
                    selectedOption === 'public'
                      ? theme.palette.primary.main
                      : undefined
                  }
                >
                  Public Road
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Council or public property
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  Permit required for placement on public roads
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {showRoadAlert && (
          <Grid container sx={{ mt: 4, mb: 2 }}>
            <Grid item xs={12}>
              <Alert
                severity="error"
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                sx={styles.alert}
              >
                <Typography sx={styles.alertTitle}>
                  Road Placement Not Available
                </Typography>
                <Typography sx={styles.alertText}>
                  The skip size that you've chosen can not be placed on public
                  roads due to road safety regulations. Please ensure you have
                  adequate private space or choose a different skip size.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onChooseDifferentSkip}
                  sx={styles.chooseSkipBtn}
                  startIcon={<HomeIcon />}
                >
                  Choose Different Skip
                </Button>
              </Alert>
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
          <Grid item>
            <Button
              variant="contained"
              color="inherit"
              onClick={onClose}
              sx={styles.backBtn(theme)}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={onContinue}
              sx={styles.actionBtn}
              disabled={showRoadAlert}
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default SkipPlacementModal
