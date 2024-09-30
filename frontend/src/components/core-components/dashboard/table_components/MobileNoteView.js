import React, { useState } from 'react'
import { TableCell, IconButton, Dialog, DialogContent, Typography, Box } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const MobileNoteCell = ({ note }) => {
  const [openModal, setOpenModal] = useState(false)
  const truncatedNote = note.length > 15 ? `${note.slice(0, 15)}...` : note

  return (
    <>
      <TableCell align='left' sx={{ padding: '0.5rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {truncatedNote}
          </Typography>
          {note && (
            <IconButton
              size="small"
              onClick={() => setOpenModal(true)}
              sx={{
                marginLeft: '0.5rem',
                padding: '0.25rem',
                flexShrink: 0,
              }}
            >
              <InfoIcon fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
            </IconButton>
          )}
        </Box>
      </TableCell>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent>
          <Typography>{note}</Typography>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MobileNoteCell