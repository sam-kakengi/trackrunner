import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Paper, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../theme/dashboard_themes/logRunModalTheme'
import { useActiveRun } from '../context/ActiveRunV2'
import { useMediaQuery } from '@mui/material'

const PreEndRunModal = ({ open, onCancel }) => {
  const { endRunPatch, setEndRunModalOpen, setPreEndRunModalOpen } = useActiveRun()
  const isMobile = useMediaQuery(modalTheme.breakpoints.down('sm'))

  const handleConfirm = async () => {
    try {
      await endRunPatch()
      setPreEndRunModalOpen(false)
      setEndRunModalOpen(true)
    } catch (error) {
      console.error('There was an error ending your run')
    }
  }

  return (
    <ThemeProvider theme={modalTheme}>
      <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
        <DialogContent sx={{ backgroundColor: modalTheme.palette.secondary.main }}>
          <Paper elevation={0} sx={{ padding: { xs: 2, sm: 3, md: 4 }, margin: 'auto', backgroundColor: modalTheme.palette.secondary.main }}>
            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12}>
                <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ color: modalTheme.palette.primary.main }} gutterBottom>
                  End Run Confirmation
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: 'black', fontWeight: 'bold' }}>
                  Are you sure you want to end your current run?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DialogActions sx={{ padding: 0, justifyContent: 'flex-start', gap: 2 }}>
                  <Button onClick={handleConfirm} variant="contained" color="primary" size={isMobile ? 'small' : 'medium'} fullWidth={isMobile}>
                    Confirm End Run
                  </Button>
                  <Button onClick={onCancel} size={isMobile ? 'small' : 'medium'} fullWidth={isMobile}>
                    Cancel
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}

export default PreEndRunModal