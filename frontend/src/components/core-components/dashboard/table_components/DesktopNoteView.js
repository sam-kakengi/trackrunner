import React from 'react'
import { Tooltip, TableCell, Typography, Box } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const DesktopNoteView = ({ note }) => (
    <Tooltip 
    title={
      <Typography sx={{ fontSize: '1rem', padding: '0.5rem' }}>{note}</Typography>
    }
    arrow
    placement="top"
    enterDelay={500}
    leaveDelay={200}
    componentsProps={{
      tooltip: {
        sx: {
          bgcolor: 'rgba(97, 97, 97, 0.9)',
          maxWidth: '25rem',
          minWidth: '7rem',
          '& .MuiTooltip-arrow': {
            color: 'rgba(97, 97, 97, 0.9)',
          },
        },
      },
    }}
  >
    <TableCell 
      align='center' 
      sx={{ 
        maxWidth: '9.375rem', 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        padding: '0.5rem', 
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {note}
        </Typography>
        {note && <InfoIcon sx={{ marginLeft: '0.25rem', cursor: 'pointer' }} />}
      </Box>
    </TableCell>
  </Tooltip>
  
)

export default DesktopNoteView