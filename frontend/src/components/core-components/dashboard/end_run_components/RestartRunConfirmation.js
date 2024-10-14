import React from 'react'
import { Dialog, DialogContent, DialogActions, Button, Typography, Paper, Grid } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../../theme/dashboard_themes/logRunModalTheme'
import { useMediaQuery } from '@mui/material'


const PreResetRunModal = ({ open, onCancel, onConfirm }) => {
  const isMobile = useMediaQuery(modalTheme.breakpoints.down('sm'))

  return (
    <ThemeProvider theme={modalTheme}>
      <Dialog open={open} onClose={onCancel} fullWidth maxWidth="sm">
        <DialogContent sx={{ backgroundColor: modalTheme.palette.secondary.main }}>
          <Paper elevation={0} sx={{ padding: { xs: 2, sm: 3, md: 4 }, margin: 'auto', backgroundColor: modalTheme.palette.secondary.main }}>
            <Grid container spacing={isMobile ? 2 : 3}>
              <Grid item xs={12}>
                <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ color: modalTheme.palette.primary.main }} gutterBottom>
                  Reset Run
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: modalTheme.palette.quaternary.main }}>
                 Resetting this run means it won't be saved.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DialogActions sx={{ padding: 0, justifyContent: 'flex-start', gap: 2 }}>
                  <Button onClick={onConfirm} variant="contained" size={isMobile ? 'small' : 'medium'} fullWidth={isMobile}>
                    Confirm
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

export default PreResetRunModal
