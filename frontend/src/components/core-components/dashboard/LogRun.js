import React, { useState, useEffect } from 'react'
import { Paper, Box, Grid, Typography, Select, CardActions, Button, Dialog, DialogContent, MenuItem, TextField, useMediaQuery, FormControl, InputLabel, Divider } from '@mui/material'
import { TimePicker, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AddIcon from '@mui/icons-material/Add'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../theme/dashboard_themes/logRunModalTheme'
import fetchRoutes from './api_calls/getRoutes'
import NewRouteModal from './AddNewRoute'
import postRunData from './api_calls/postRun'


const LogRunModal = ({ open, handleClose }) => {
  const isMobile = useMediaQuery(modalTheme.breakpoints.down('sm'))
  const [routesArray, setRoutesArray] = useState([])
  const [newRouteOpen, setNewRouteOpen] = useState(false)

  const [runData, setRunData] = useState({
    start: null,
    end: null,
    duration: null,
    date: null,
    route: '',
    notes: '',
  });

  const formChange = (field) => (event) => {
    setRunData({ ...runData, [field]: event.target.value || ''})
  };

  const newRouteModalOpen = () => {
    setNewRouteOpen(true)
  }

  const newRouteModalClose = () => {
    setNewRouteOpen(false)
  }

  useEffect(() => {
    if(open) {
      const getRoutes = async () => {
        const retrievedRoutes = await fetchRoutes()
        setRoutesArray(retrievedRoutes)
      }
      getRoutes()
    }
  }, [open])

  const addNewRoute = (newRoute) => {
    console.log(newRoute)
    setRoutesArray(prevRoutes => [...prevRoutes, newRoute])
    setRunData(prevRunData => ({ ...prevRunData, route: newRoute.name })) 
    newRouteModalClose()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      
      const formattedData = {
        start: runData.start,
        finished: runData.end,
        duration: runData.duration,
        date: runData.date,
        route: runData.route,
        notes: runData.notes,
      }
  
      
      const response = await postRunData(formattedData)
      console.log('Run data submitted successfully')
  
      
      handleClose()
  
      
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
                    <TimePicker
                      label="Start"
                      sx={{ width: '100%' }}
                      value={runData.start}
                      onChange={(newStart) => {
                        const newEnd = runData.end;
                        const duration = newEnd && newStart ? newEnd.diff(newStart, 'minutes') : null;
                        setRunData({ ...runData, start: newStart, duration });
                      }}
                      slots={{
                        textField: (params) => (
                          <TextField {...params} variant="outlined" size={isMobile ? 'small' : 'medium'} fullWidth />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TimePicker
                      label="Finish"
                      sx={{ width: '100%' }}
                      value={runData.end}
                      onChange={(newFinish) => {
                        const newStart = runData.start;
                        const duration = newStart && newFinish ? newFinish.diff(newStart, 'minutes') : null;
                        setRunData({ ...runData, end: newFinish, duration });
                      }}
                      slots={{
                        textField: (params) => (
                          <TextField {...params} variant="outlined" size={isMobile ? 'small' : 'medium'} fullWidth />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date"
                      sx={{ width: '100%' }}
                      value={runData.date}
                      onChange={(newDate) => setRunData({ ...runData, date: newDate })}
                      slots={{
                        textField: (params) => (
                          <TextField {...params} variant="outlined" size={isMobile ? 'small' : 'medium'} fullWidth />
                        ),
                        
                      }}
                        
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth size={isMobile ? 'small' : 'medium'}>
                      <InputLabel id="route-label">Route</InputLabel>
                      <Select
                        labelId="route-label"
                        value={runData.route || ''}
                        
                        onChange={(e) => { 
                          
                          setRunData({ ...runData, route: e.target.value }) 
                        }}
                        label="Route"

                        MenuProps={{
                          PaperProps: {
                            sx: {
                              maxHeight: '12rem',
                              overflowY: 'auto',   
                            },
                          },
                        }}
                      >

                        
                          {routesArray.map((route, index) => (
                            <MenuItem 
                              key={index} 
                              value={route.id} 
                              sx={{ height: 'auto', maxHeight: '3rem', overflow: 'auto' }}
                            >
                              {route.name}
                            </MenuItem>
                          ))}
                        
                        
                        <MenuItem sx={{position: 'sticky',
                        bottom: 0,
                        backgroundColor: modalTheme.palette.tertiary.main,
                        borderTop: '1px solid white',
                        zIndex: 1,}} 
                        onClick={() => {
                            
                            newRouteModalOpen();
                          }}>
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

export default LogRunModal;