import React, { useState } from 'react'
import { Dialog, DialogContent, CardActions, Typography, TextField, Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import modalTheme from '../../../theme/dashboard_themes/logRunModalTheme'
import postRoute from './api_calls/postRoute'

const NewRouteModal = ({ postNewRoute, newRouteOpen, newRouteClose }) => {
    const [routeName, setRouteName] = useState('')
    const [distance, setDistance] = useState('')

    const sendNewRoute = async (event) => {
      event.preventDefault();
      
      try {
        const newRoute = await postRoute(routeName, distance)
        postNewRoute(newRoute)
        newRouteClose()
      } catch(error) {
        console.log('Error when trying to post new route')
      }
    }

    return (
      
        <>
        <ThemeProvider theme={modalTheme}>
          <Dialog open={newRouteOpen} onClose={newRouteClose} fullWidth maxWidth="sm">
            <DialogContent sx={{ backgroundColor: modalTheme.palette.secondary.main }}>
              <form onSubmit={sendNewRoute}>
                <Typography variant="h6" sx={{color: modalTheme.palette.primary.main}}>Add a New Route</Typography>
                <TextField label="Route Name" value={routeName} onChange={(e) => setRouteName(e.target.value)} fullWidth margin="normal" />
                <TextField label="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} fullWidth margin="normal" />
                <CardActions>
                  <Button variant="contained" type='submit'>Save</Button>
                  <Button variant="outlined" onClick={newRouteClose}>Cancel</Button>
                </CardActions>
              </form>
            </DialogContent>
          </Dialog>
        </ThemeProvider>
        </>
    )
  }
  
  export default NewRouteModal
  