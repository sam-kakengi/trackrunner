import React, { useState } from 'react'
import { TableCell, Typography, Tooltip, IconButton, Dialog, DialogContent, Box } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

const RouteNameTruncated = ({ routeName, isMobile, fontSize }) => {
  const [openModal, setOpenModal] = useState(false)
  const shouldTruncate = routeName.length > 12
  const displayName = shouldTruncate ? `${routeName.slice(0, 10)}...` : routeName

  const cellWidth = isMobile ? '35%' : '20%'

  if (isMobile) {
    return (
      <>
        <TableCell align='center' sx={{ padding: '0.25rem', width: cellWidth }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '7.5rem',
            margin: '0 auto'
          }}>
            <Typography 
              sx={{ 
                fontSize: fontSize, 
                flexGrow: 1,
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {displayName}
            </Typography>
            {shouldTruncate && (
              <IconButton
                size="small"
                onClick={() => setOpenModal(true)}
                sx={{
                  padding: '0.1rem',
                }}
              >
                <InfoIcon fontSize="small" sx={{ color: 'lightgray' }} />
              </IconButton>
            )}
          </Box>
        </TableCell>
        <Dialog open={openModal} onClose={() => setOpenModal(false)}>
          <DialogContent>
            <Typography>{routeName}</Typography>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  return (
    <Tooltip title={routeName}>
      <TableCell align='center' sx={{ padding: { sm: '0.5rem', md: '0.75rem' }, width: cellWidth }}>
        <Typography sx={{ 
          fontSize: fontSize,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {routeName}
        </Typography>
      </TableCell>
    </Tooltip>
  )
}

export default RouteNameTruncated