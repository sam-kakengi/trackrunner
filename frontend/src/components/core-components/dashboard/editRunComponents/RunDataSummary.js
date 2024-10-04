import React from 'react'
import { Box, Typography } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import editCurrentRunData from '../../../../theme/dashboard_themes/editRunCurrentData'

const RunDataSummary = ({ run }) => {
  return (
    <ThemeProvider theme={editCurrentRunData}>
      <Box sx={{ 
        border: '0.1rem solid black',
        backgroundColor: 'inherit', 
        borderRadius: 1, 
        padding: 2, 
        marginBottom: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography>Current Run Data</Typography>
        <Typography>Date: {run.date}</Typography>
        <Typography>Duration: {run.duration}</Typography>
        <Typography>Route: {run.route}</Typography>
      </Box>
    </ThemeProvider>
  )
}

export default RunDataSummary