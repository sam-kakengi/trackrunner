import React, { useState, useEffect } from 'react'
import { Paper, Box, Grid, Typography, Select, CardActions, Button, Dialog, DialogContent, MenuItem, TextField, useMediaQuery, FormControl, InputLabel, Divider } from '@mui/material'
import { TimePicker, DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import AddIcon from '@mui/icons-material/Add'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../theme/dashboard_themes/logRunModalTheme'
import axios from 'axios'
import fetchRoutes from './api_calls/getRoutes'
import NewRouteModal from './AddNewRoute'

const LogRunModal = ({ open, handleClose }) => {
  const isMobile = useMediaQuery(modalTheme.breakpoints.down('sm'))
  const [routesArray, setRoutesArray] = useState([])
  const [newRouteOpen, setNewRouteOpen] = useState(false)

  const [runData, setRunData] = useState({
    runTime: null,
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



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Submitted')
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
                      label="Run Time"
                      sx={{ width: isMobile ? '100%' : '75%' }}
                      value={runData.runTime}
                      onChange={(newTime) => setRunData({ ...runData, runTime: newTime })}
                      slots={{
                        textField: (params) => (
                          <TextField {...params} variant="outlined" size={isMobile ? 'small' : 'medium'} fullWidth />
                        ),
                        actionBar: (props) => (
                            <Box {...props} sx={{marginLeft: 'auto', marginTop: '2.5rem', marginBottom: '1rem'}}>
                              <Button onClick={props.onCancel} sx={{ color: 'black', fontSize:'0.8rem', fontWeight: '600' }}>Cancel</Button>
                              <Button onClick={props.onAccept} sx={{ color: 'black', fontSize: '0.8rem', fontWeight: '600'  }}>OK</Button>
                            </Box>
                          ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Date"
                      sx={{ width: isMobile ? '100%' : '75%' }}
                      value={runData.date}
                      onChange={(newDate) => setRunData({ ...runData, date: newDate })}
                      slots={{
                        textField: (params) => (
                          <TextField {...params} variant="outlined" size={isMobile ? 'small' : 'medium'} fullWidth />
                        ),
                        actionBar: (props) => (
                            <Box {...props} sx={{marginLeft: 'auto', marginTop: '2.5rem', marginBottom: '1rem'}}>
                              <Button onClick={props.onCancel} sx={{ color: 'black', fontSize:'0.8rem', fontWeight: '600' }}>Cancel</Button>
                              <Button onClick={props.onAccept} sx={{ color: 'black', fontSize: '0.8rem', fontWeight: '600'  }}>OK</Button>
                            </Box>
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
                        onChange={formChange('route')}
                        label="Route"
                      >
                        {routesArray.map((route, index) => (
                          <MenuItem key={index} value={route}>
                            {route.name}
                          </MenuItem>
                        ))}
                        {routesArray.length > 0 && <Divider />}
                        <MenuItem onClick={() => {
                            
                            newRouteModalOpen();
                          }}>
                          <AddIcon sx={{ mr: 1 }} />
                          Add New Route
                        </MenuItem>
                        
                      </Select>
                      <NewRouteModal newRouteOpen={newRouteOpen} newRouteClose={newRouteModalClose} />
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
                        justifyContent: isMobile ? 'center' : 'flex-end',
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
                        <Button size={isMobile ? 'small' : 'medium'} variant="outlined" fullWidth={isMobile} onClick={handleClose}>
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
    </ThemeProvider>
  );
};

export default LogRunModal;