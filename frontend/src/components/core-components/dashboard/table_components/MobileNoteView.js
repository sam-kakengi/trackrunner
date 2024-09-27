import React, { useState } from 'react'
import { TableCell, IconButton, Dialog, DialogContent, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const MobileNoteCell = ({ note }) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <TableCell align='center'>
        {note.slice(0, 20)}
        {note.length > 20 && '...'}
        {note && <IconButton
          size="small"
          onClick={() => setOpenModal(true)}
          sx={{
            marginLeft: '0.5rem',
            padding: '0.25rem',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <InfoIcon fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
        </IconButton>}
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