import React, { useState, useEffect, useMemo } from 'react'
import {
  Paper, Grid, Typography, Select, CardActions, Button, Dialog, DialogContent, MenuItem, TextField, useMediaQuery,
  FormControl, InputLabel, FormHelperText
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AddIcon from '@mui/icons-material/Add'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../theme/dashboard_themes/logRunModalTheme'
import fetchRoutes from './api_calls/getRoutes'
import NewRouteModal from './AddNewRoute'
import postRunData from './api_calls/postRun'
import convertRunTimeToSeconds from '../../../utilities/timeUtil'
import { handleTimeChange } from '../../../utilities/timeUtil'
import { toast } from 'react-toastify'

const LogRunModal = ({ reloadDashboard, open, handleClose, reloadChart }) => {
  const isMobile = useMediaQuery(modalTheme.breakpoints.down('sm'))
  const [routesArray, setRoutesArray] = useState([])
  const [newRouteOpen, setNewRouteOpen] = useState(false)

  const [runData, setRunData] = useState({
    runTime: '',
    date: dayjs(),
    route: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [dateError, setDateError] = useState(null)


  const formChange = (field) => (event) => {
    setRunData({ ...runData, [field]: event.target.value || '' })
    setErrors({ ...errors, [field]: '' })
  }

  const newRouteModalOpen = () => {
    setNewRouteOpen(true)
  }

  const newRouteModalClose = () => {
    setNewRouteOpen(false)
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

  const addNewRoute = (newRoute) => {
    setRoutesArray((prevRoutes) => [...prevRoutes, newRoute])
    setRunData((prevRunData) => ({ ...prevRunData, route: newRoute.name }))
    setErrors({ ...errors, route: '' })
    newRouteModalClose()
  }

  const validateForm = () => {
    let formErrors = {}
  
    if (!runData.route) {
      formErrors.route = 'Route is required'
    }
  
    if (!dayjs(runData.date).isValid()) {
      formErrors.date = 'Invalid date'
    }
  
    if (!runData.runTime) {
      formErrors.runTime = 'Run Time is required'
    }
  
    setErrors(formErrors)
    return Object.keys(formErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const durationInSeconds = convertRunTimeToSeconds(runData.runTime)
    const formattedDate = runData.date.format('YYYY-MM-DD')
    const startDateTime = `${formattedDate}T10:00:00`
    const finishDateTime = `${formattedDate}T11:00:00`

    try {
      const formattedData = {
        start: startDateTime,
        finished: finishDateTime,
        duration: durationInSeconds,
        route: runData.route,
        notes: runData.notes,
      }

      const response = await postRunData(formattedData)
      console.log('Run data submitted successfully')

      handleClose()
      toast.success('Run added successfully!')
      if (reloadDashboard) {
        reloadDashboard()
      }
      if (reloadChart) {
        reloadChart()
      }

    } catch (error) {
      console.error('Error submitting run data')
    }
  }

  return (
    <ThemeProvider theme={modalTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogContent sx={{ backgroundColor: modalTheme.palette.secondary.main }}>
            <Paper elevation={0} sx={{ padding: { xs: 2, sm: 3, md: 4 }, margin: 'auto', backgroundColor: modalTheme.palette.secondary.main }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={isMobile ? 2 : 3}>
                  <Grid item xs={12}>
                    <Typography variant={isMobile ? 'h6' : 'h5'} sx={{ color: modalTheme.palette.primary.main }} gutterBottom>
                      Log your run
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Run Time"
                      sx={{ width: '100%', color: 'white' }}
                      value={runData.runTime}
                      onChange={(e) => {
                        handleTimeChange(e, runData, setRunData)
                        setErrors({ ...errors, runTime: '' })
                      }}
                      placeholder="HH:MM:SS"
                      required
                      error={!!errors.runTime}
                      helperText={errors.runTime}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date"
                      value={runData.date}
                      onChange={(newDate) => {
                        setRunData({ ...runData, date: newDate })
                        if (dayjs(newDate).isValid()) {
                          setErrors({ ...errors, date: '' })
                        }
                      }}
                      onError={(newError) => {
                        setDateError(newError)
                        if (newError) {
                          setErrors({ ...errors, date: 'Invalid or out of range date' })
                        }
                      }}
                      slotProps={{
                        textField: {
                          required: true,
                          error: !!errors.date || !!dateError,
                          helperText: errors.date,
                          variant: 'outlined',
                          size: isMobile ? 'small' : 'medium',
                          fullWidth: true,
                          InputLabelProps: { shrink: true, required: true },
                        },
                      }}
                    />
                  </Grid>


                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth error={!!errors.route} size={isMobile ? 'small' : 'medium'}>
                      <InputLabel required id="route-label">Route</InputLabel>
                      <Select
                        labelId="route-label"
                        value={runData.route || ''}
                        onChange={(e) => {
                          setRunData({ ...runData, route: e.target.value })
                          setErrors({ ...errors, route: '' })
                        }}
                        label="Route"
                      >
                        {routesArray.map((route, index) => (
                          <MenuItem key={index} value={route.id} sx={{ height: 'auto', maxHeight: '3rem', overflow: 'auto', color: 'white' }}>
                            {route.name}
                          </MenuItem>
                        ))}

                        <MenuItem sx={{ position: 'sticky', bottom: 0, backgroundColor: modalTheme.palette.tertiary.main, borderTop: '1px solid white', zIndex: 1, color: 'white' }} onClick={newRouteModalOpen}>
                          <AddIcon sx={{ mr: 1 }} />
                          Add New Route
                        </MenuItem>
                      </Select>
                      {errors.route && <FormHelperText>{errors.route}</FormHelperText>}
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

                  <Grid item xs={12} sm={12}>
                    <CardActions
                      sx={{
                        display: 'flex',
                        justifyContent: isMobile ? 'center' : 'flex-start',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? 2 : 1,
                        width: '100%',
                        '& > :not(style) ~ :not(style)': {
                          marginLeft: 0,
                        },
                      }}
                    >
                      <Button size={isMobile ? 'small' : 'medium'} type="submit" variant="contained" fullWidth={isMobile}>
                        Submit
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
      </LocalizationProvider>
      <NewRouteModal postNewRoute={addNewRoute} newRouteOpen={newRouteOpen} newRouteClose={newRouteModalClose} />
    </ThemeProvider>
  )
}

export default LogRunModal