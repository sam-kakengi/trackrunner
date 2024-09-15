import React, { useState } from 'react'
import { Dialog, DialogContent, CardActions, Typography, TextField, Button } from '@mui/material'


const NewRouteModal = ({ newRouteOpen, newRouteClose }) => {
    const [routeName, setRouteName] = useState('')
    const [distance, setDistance] = useState('')

    return (
      <Dialog open={newRouteOpen} onClose={newRouteClose} fullWidth maxWidth="sm">
        <DialogContent>
          <Typography variant="h6">Add a New Route</Typography>
          <TextField label="Route Name" value={routeName} onChange={(e) => setRouteName(e.target.value)} fullWidth margin="normal" />
          <TextField label="Distance (km)" value={distance} onChange={(e) => setDistance(e.target.value)} fullWidth margin="normal" />
          <CardActions>
            <Button variant="contained" onClick={newRouteClose}>Save</Button>
            <Button variant="outlined" onClick={newRouteClose}>Cancel</Button>
          </CardActions>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default NewRouteModal
  