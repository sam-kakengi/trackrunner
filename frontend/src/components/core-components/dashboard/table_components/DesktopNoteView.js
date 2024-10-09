import React from 'react'
import { Tooltip, TableCell, Typography, Box } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const DesktopNoteView = ({ note }) => {
  const truncatedNote = note.length > 15 ? `${note.slice(0, 15)}...` : note;

  return (
    <Tooltip 
      title={<Typography sx={{ fontSize: '1rem', padding: '0.5rem' }}>{note}</Typography>}
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
        align='left' 
        sx={{ 
          maxWidth: '9.375rem', 
          padding: '0.5rem', 
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {truncatedNote}
          </Typography>
          {note && <InfoIcon sx={{ marginLeft: '0.25rem', flexShrink: 0 }} />}
        </Box>
      </TableCell>
    </Tooltip>
  )
}

export default DesktopNoteView