import React, { useState, useEffect } from 'react'
import { Paper, Grid, Typography, Select, CardActions, Button, Dialog, DialogContent, MenuItem, TextField, useMediaQuery, FormControl, InputLabel } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../theme/dashboard_themes/logRunModalTheme'
import fetchRoutes from './api_calls/getRoutes'
import NewRouteModal from './AddNewRoute'
import AddIcon from '@mui/icons-material/Add'
import { useActiveRun } from '../context/ActiveRun'
import RunningAPI from '../../../utilities/apiClient'

const getRecentRun = async () => {
  const api = new RunningAPI()
  const data = await api.getData('run/recent')
  return data
}

const EndRunModal = ({ open, handleClose }) => {
  const isMobile = useMediaQuery(modalTheme.breakpoints.down('sm'))
  const [routesArray, setRoutesArray] = useState([])
  const [newRouteOpen, setNewRouteOpen] = useState(false)
  const [recentRun, setRecentRun] = useState(null)
  const [runData, setRunData] = useState({
    routeID: '',
    routeName: '',
    notes: '',
  })

  const { endRun, setEndRunModalOpen } = useActiveRun()

  useEffect(() => {
    if (open) {
      const fetchData = async () => {
        try {
          const [retrievedRoutes, recentRunData] = await Promise.all([
            fetchRoutes(),
            getRecentRun()
          ])
          setRoutesArray(retrievedRoutes)
          setRecentRun(recentRunData)
          
          
          const matchingRoute = retrievedRoutes.find(route => route.name === recentRunData.route)
          setRunData({
            routeID: matchingRoute ? matchingRoute.id : '',
            routeName: recentRunData.route,
            notes: recentRunData.notes || '',
          })
        } catch (error) {
          console.error('Error fetching data')
        }
      }
      fetchData()
    }
  }, [open, setEndRunModalOpen])

  const formChange = (field) => (event) => {
    setRunData(prevData => {
      const newData = { ...prevData, [field]: event.target.value || '' }
      return newData
    })
  }

  const handleEndRun = async (event) => {
    event.preventDefault()
    if (recentRun) {
      await endRun(recentRun.id, runData.routeID, runData.notes)
      handleClose()
    } else {
      console.error('No recent run data available')
    }
  }

  const newRouteModalOpen = () => {
    setNewRouteOpen(true)
  }

  const newRouteModalClose = () => {
    setNewRouteOpen(false)
  }

  const addNewRoute = (newRoute) => {
    setRoutesArray(prevRoutes => [...prevRoutes, newRoute])
    setRunData(prevRunData => ({ ...prevRunData, routeID: newRoute.id, routeName: newRoute.name }))
    newRouteModalClose()
  }

  return (
    <ThemeProvider theme={modalTheme}>
      <Dialog open={open}  fullWidth maxWidth="md">
        <DialogContent sx={{ backgroundColor: modalTheme.palette.secondary.main }}>
          <Paper elevation={0} sx={{ padding: { xs: 2, sm: 3, md: 4 }, margin: 'auto', backgroundColor: modalTheme.palette.secondary.main }}>
            <form onSubmit={handleEndRun}>
              <Grid container spacing={isMobile ? 2 : 3}>
                <Grid item xs={12}>
                  <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ color: modalTheme.palette.primary.main }} gutterBottom>
                    End Your Run
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                    <InputLabel id="route-label">Route</InputLabel>
                    <Select
                      labelId="route-label"
                      value={runData.routeID || ''}
                      onChange={(e) => {
                        const selectedRoute = routesArray.find(route => route.id === e.target.value)
                        setRunData({ 
                          ...runData, 
                          routeID: e.target.value,
                          routeName: selectedRoute ? selectedRoute.name : ''
                        })
                      }}
                      label="Route"
                    >
                      {routesArray.map((route) => (
                        <MenuItem key={route.id} value={route.id}>
                          {route.name}
                        </MenuItem>
                      ))}
                      <MenuItem
                        sx={{
                          position: 'sticky',
                          bottom: 0,
                          backgroundColor: modalTheme.palette.tertiary.main,
                          borderTop: '1px solid white',
                          zIndex: 1,
                        }}
                        onClick={newRouteModalOpen}
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
                     End Run
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

export default EndRunModal