import React, { useState } from 'react'
import { Dialog, DialogContent, DialogActions, Button, Typography, Paper, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../../theme/dashboard_themes/logRunModalTheme'
import { useActiveRun } from '../../context/ActiveRun'
import { useMediaQuery } from '@mui/material'
import { grey } from '@mui/material/colors' 
import PreResetRunModal from './RestartRunConfirmation' 

const PreEndRunModal = ({ open, onCancel }) => {
  const { endRunPatch, setEndRunModalOpen, setPreEndRunModalOpen, resumeRun, pausedRun, 
    handleConfirmReset, resetRunModalOpen, setResetRunModalOpen } = useActiveRun()
    
  const isMobile = useMediaQuery(modalTheme.breakpoints.down('sm'))

  const handleConfirm = async () => {
    try {
      if (pausedRun.isPaused) {
        await resumeRun()
      }
      await endRunPatch()
      setPreEndRunModalOpen(false)
      setEndRunModalOpen(true)
    } catch (error) {
      console.error('There was an error ending your run')
    }
  }

  const handleResetRun = () => {
    setResetRunModalOpen(true)
  }

  return (
    <ThemeProvider theme={modalTheme}>
      <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
        <DialogContent sx={{ backgroundColor: modalTheme.palette.secondary.main }}>
          <Paper elevation={0} sx={{ padding: { xs: 2, sm: 3, md: 4 }, margin: 'auto', backgroundColor: modalTheme.palette.secondary.main }}>
            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12}>
                <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ color: modalTheme.palette.primary.main }} gutterBottom>
                  Complete Run
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: modalTheme.palette.quaternary.main }}>
                  Are you sure you want to end your current run?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DialogActions sx={{ padding: 0, justifyContent: 'flex-start', gap: 2 }}>
                  <Button onClick={handleConfirm} variant="contained" color="primary" size={isMobile ? 'small' : 'medium'} fullWidth={isMobile}>
                     End Run
                  </Button>

                  <Button onClick={handleResetRun} variant="contained" sx={{ backgroundColor: grey[200] }} size={isMobile ? 'small' : 'medium'} fullWidth={isMobile}>
                    Reset Run
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
      
      {/* Reset Run Confirmation Modal */}
      <PreResetRunModal
        open={resetRunModalOpen}
        onCancel={() => setResetRunModalOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </ThemeProvider>
  )
}

export default PreEndRunModal