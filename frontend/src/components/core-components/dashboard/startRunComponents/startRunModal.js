import React, { useState, useEffect } from 'react'
import { Paper, Grid, Typography, Select, CardActions, Button, Dialog, DialogContent, MenuItem, TextField, useMediaQuery, FormControl, InputLabel } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../../theme/dashboard_themes/logRunModalTheme'
import fetchRoutes from '../api_calls/getRoutes'
import NewRouteModal from '../AddNewRoute'
import AddIcon from '@mui/icons-material/Add'
import { useActiveRun } from '../../context/ActiveRun'

const StartRunModal = ({ open, handleClose }) => {
  const isMobile = useMediaQuery(modalTheme.breakpoints.down('sm'))
  const [routesArray, setRoutesArray] = useState([])
  const [newRouteOpen, setNewRouteOpen] = useState(false)

  const [runData, setRunData] = useState({
    routeId: '',
    routeName: '',
    notes: '',
  })

  const { startRun } = useActiveRun() 

  const formChange = (field) => (event) => {
    setRunData({ ...runData, [field]: event.target.value || '' })
  }

  const handleStartRun = async (event) => {
    event.preventDefault()
    await startRun(runData.routeId, runData.notes)
    handleClose() 
  }

  useEffect(() => {
    if (open) {
      const getRoutes = async () => {
        const retrievedRoutes = await fetchRoutes()
        setRoutesArray(retrievedRoutes)
      }
      getRoutes()
    }
  }, [open])

  const newRouteModalOpen = () => {
    setNewRouteOpen(true)
  }

  const newRouteModalClose = () => {
    setNewRouteOpen(false)
  }

  const addNewRoute = (newRoute) => {
    setRoutesArray(prevRoutes => [...prevRoutes, newRoute])
    setRunData(prevRunData => ({ ...prevRunData, routeId: newRoute.id, routeName: newRoute.name })) 
    newRouteModalClose()
  }

  return (
    <ThemeProvider theme={modalTheme}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent sx={{ backgroundColor: modalTheme.palette.secondary.main }}>
          <Paper elevation={0} sx={{ padding: { xs: 2, sm: 3, md: 4 }, margin: 'auto', backgroundColor: modalTheme.palette.secondary.main }}>
            <form onSubmit={handleStartRun}>
              <Grid container spacing={isMobile ? 2 : 3}>
                <Grid item xs={12}>
                  <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ color: modalTheme.palette.primary.main }} gutterBottom>
                    Start Your Run
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                    <InputLabel id="route-label">Route</InputLabel>
                    <Select
                      labelId="route-label"
                      value={runData.routeId || ''}
                      onChange={(e) => {
                        if (e.target.value === 'add_new_route') {
                          newRouteModalOpen()
                        } else {
                          const selectedRoute = routesArray.find(route => route.id === e.target.value)
                          if (selectedRoute) {
                            setRunData({ ...runData, routeId: selectedRoute.id, routeName: selectedRoute.name })
                          }
                        }
                      }}
                      label="Route"
                    >
                      {routesArray.map((route) => (
                        <MenuItem key={route.id} value={route.id}>
                          {route.name}
                        </MenuItem>
                      ))}
                      
                      <MenuItem
                        value="add_new_route"
                        sx={{
                          position: 'sticky',
                          bottom: 0,
                          backgroundColor: modalTheme.palette.tertiary.main,
                          borderTop: '1px solid white',
                          zIndex: 1,
                        }}
                      >
                        <AddIcon sx={{ mr: 1 }} />
                        Add New Route
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Notes"
                    multiline
                    rows={isMobile ? 3 : 5}
                    value={runData.notes}
                    onChange={formChange('notes')}
                    size={isMobile ? 'small' : 'medium'}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12}>
                  <CardActions
                    sx={{
                      display: 'flex',
                      justifyContent: isMobile ? 'center' : 'flex-start',
                      flexDirection: isMobile ? 'column' : 'row',
                      gap: isMobile ? 2 : 1,
                      width: '100%',
                    }}
                  >
                    <Button size={isMobile ? 'small' : 'medium'} type="submit" variant="contained" fullWidth={isMobile}>
                      Start Run
                    </Button>
                    <Button size={isMobile ? 'small' : 'medium'} fullWidth={isMobile} onClick={handleClose}>
                      Cancel
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </DialogContent>
      </Dialog>
      <NewRouteModal postNewRoute={addNewRoute} newRouteOpen={newRouteOpen} newRouteClose={newRouteModalClose} />
    </ThemeProvider>
  )
}

export default StartRunModal
