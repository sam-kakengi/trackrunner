import React, { useState, useEffect } from 'react'
import { Paper, Grid, Typography, Select, CardActions, Button, Dialog, DialogContent, MenuItem, TextField, useMediaQuery, FormControl, InputLabel } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../../theme/dashboard_themes/editRunModalTheme'
import fetchRoutes from '../api_calls/getRoutes'
import NewRouteModal from '../AddNewRoute'
import AddIcon from '@mui/icons-material/Add'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import RunningAPI from '../../../../utilities/apiClient'
import { formatDuration } from '../../../../utilities/timeUtil'

dayjs.extend(customParseFormat)

const EditRunModal = ({ open, handleClose, run, onRunUpdated }) => {
  const isMobile = useMediaQuery(modalTheme.breakpoints.down('sm'))
  const [routesArray, setRoutesArray] = useState([])
  const [newRouteOpen, setNewRouteOpen] = useState(false)

  const [runData, setRunData] = useState({
    id: '',
    routeId: '',
    routeName: '',
    notes: '',
    duration: dayjs().startOf('day'),
    date: dayjs(),
  })

  useEffect(() => {
    if (open && run) {
      let parsedDuration = dayjs().startOf('day')
  
      if (run.duration) {
        const [minutes, seconds] = run.duration.split(':').map(Number)
        parsedDuration = parsedDuration.set('minute', minutes).set('second', seconds)
      }
  
      const parsedDate = dayjs(run.date, 'Do MMM')
  
      setRunData({
        id: run.id || '',
        routeId: run.routeId || '',
        routeName: run.route || '',
        notes: run.notes || '',
        duration: parsedDuration,
        date: parsedDate.isValid() ? parsedDate : dayjs(),
      })
    }
  
    const getRoutes = async () => {
      const retrievedRoutes = await fetchRoutes()
      setRoutesArray(retrievedRoutes)
    }
  
    getRoutes()
  }, [open, run])

  useEffect(() => {
    if (routesArray.length > 0 && run?.route) {
      const matchingRoute = routesArray.find(route => route.name === run.route)
      if (matchingRoute) {
        setRunData(prevRunData => ({
          ...prevRunData,
          routeId: matchingRoute.id,
          routeName: matchingRoute.name
        }))
        
      }
    }
  }, [routesArray, run])

  const formChange = (field) => (event) => {
    setRunData({ ...runData, [field]: event.target.value || '' })
  }

  const handleDateChange = (newDate) => {
    setRunData({ ...runData, date: newDate })
  }

  const handleDurationChange = (newDuration) => {
    if (newDuration === null || newDuration.isSame(dayjs().startOf('day'))) {
      setRunData((prevData) => ({
        ...prevData,
        duration: dayjs().startOf('day').add(1, 'second'),
      }))
    } else {
      setRunData((prevData) => ({
        ...prevData,
        duration: newDuration,
      }))
    }
  }

  const handleSaveRun = async (event) => {
    event.preventDefault()

    if (!runData.duration || runData.duration.isSame(dayjs().startOf('day'))) {
      console.error('Invalid duration')
      return 'Invalid duration'
    }
    const api = new RunningAPI()

    const durationInSeconds = runData.duration.hour() * 3600 + runData.duration.minute() * 60 + runData.duration.second()
    const formattedDate = runData.date.format('YYYY-MM-DDTHH:mm:ss')

    const formattedData = {
      route: runData.routeId,
      notes: runData.notes,
      duration: durationInSeconds,
      finished: formattedDate,
    }

    try {
      const response = await api.patchDjangoData(`run/${runData.id}/`, formattedData)
      if (response) {
        const updatedRun = {
          ...response,
          duration: formatDuration(response.duration),
          date: dayjs(response.finished).format('DD/MM/YYYY'),
        }
        onRunUpdated(updatedRun)
        handleClose()
      } else {
        console.error('Failed to update run')
      }
    } catch (error) {
      console.error('Error updating run')
    }
  }

  const newRouteModalOpen = () => setNewRouteOpen(true)
  const newRouteModalClose = () => setNewRouteOpen(false)

  const addNewRoute = (newRoute) => {
    setRoutesArray((prevRoutes) => [...prevRoutes, newRoute])
    setRunData((prevRunData) => ({ ...prevRunData, routeId: newRoute.id, routeName: newRoute.name }))
    newRouteModalClose()
  }

  return (
    <ThemeProvider theme={modalTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogContent sx={{ backgroundColor: modalTheme.palette.secondary.main }}>
            <Paper elevation={0} sx={{ padding: { xs: 2, sm: 3, md: 4 }, margin: 'auto', backgroundColor: modalTheme.palette.secondary.main }}>
              <form onSubmit={handleSaveRun}>
                <Grid container spacing={isMobile ? 2 : 8}>
                  <Grid item xs={12}>
                    <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ color: modalTheme.palette.primary.main }} gutterBottom>
                      Edit your run
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TimePicker
                      label="Run Time"
                      value={runData.duration}
                      onChange={handleDurationChange}
                      views={['hours', 'minutes', 'seconds']}
                      format="HH:mm:ss"
                      ampm={false}
                      slotProps={{
                        textField: {
                          error: false,
                        },
                      }}
                      disableFuture
                      sx={{width: '100%'}}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date"
                      value={runData.date}
                      onChange={handleDateChange}
                      renderInput={(params) => <TextField {...params} fullWidth size={isMobile ? 'small' : 'medium'} />}
                      sx={{width: '100%'}}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl size={isMobile ? 'small' : 'medium'} fullWidth>
                      <InputLabel id="route-label">Route</InputLabel>
                      <Select
                        labelId="route-label"
                        value={runData.routeId || ''}
                        onChange={(e) => {
                          if (e.target.value === 'add_new_route') {
                            newRouteModalOpen()
                          } else {
                            const selectedRoute = routesArray.find((route) => route.id === e.target.value)
                            if (selectedRoute) {
                              setRunData({ ...runData, routeId: selectedRoute.id, routeName: selectedRoute.name })
                            }
                          }
                        }}
                        label="Route"
                      >
                        {routesArray.map((route) => (
                          <MenuItem key={route.id} value={route.id} sx={{color: modalTheme.palette.quaternary.main}}>
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
                            color: modalTheme.palette.quaternary.main
                          }}

                        >
                          <AddIcon sx={{ mr: 1 }} />
                          Add New Route
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
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

                  <Grid item xs={12} sm={6}>
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
                        Save
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
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default EditRunModal
