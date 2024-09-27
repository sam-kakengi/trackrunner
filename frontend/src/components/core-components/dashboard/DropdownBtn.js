import React, { useState } from 'react'
import { Button, Menu, MenuItem, Box, ButtonGroup } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useTheme } from '@mui/material/styles'

const DropdownBtn = ({ 
  handleStartRunOpen, 
  handleLogRunOpen, 
  handleEndRunClick, 
  togglePauseResume, 
  activeRun, 
  pausedRun,
  isLoading
}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const theme = useTheme()

    const handleClick = () => {
        if (activeRun?.isRunning) {
            togglePauseResume()
        } else {
            handleStartRunOpen()
        }
    }
    
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget) 
    }
    
    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleLogRunClick = () => {
        handleLogRunOpen()
        handleMenuClose()
    }

    const handleEndRunClickWrapper = () => {
        handleEndRunClick()
        handleMenuClose()
    }

    return (
        <Box>
            <ButtonGroup variant="contained" sx={{ backgroundColor: theme.primary, color: theme.text.secondary, height: '2.3rem' }}>
                <Button
                    onClick={handleClick}
                    sx={{ backgroundColor: theme.primary.main, color: theme.text.secondary, width: '8rem', height: '100%' }}
                    disabled={isLoading}
                >
                    {activeRun?.isRunning 
                        ? (pausedRun.isPaused ? 'Resume' : 'Pause') 
                        : 'Start Timer'}
                </Button>
                <Button
                    size="small"
                    onClick={handleMenuClick}
                    sx={{ backgroundColor: theme.primary.main, color: theme.text.secondary, width: {xs: '1rem'}, height: '100%' }}
                    disabled={isLoading}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                MenuListProps={{
                    'aria-labelledby': 'dropdown-button',
                    sx: {paddingTop: '0', paddingBottom: '0'}
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right', 
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right', 
                }}
            >
                {activeRun?.isRunning ? (
                    <MenuItem onClick={handleEndRunClickWrapper} sx={{width: '11rem'}}>End Run</MenuItem>
                ) : (
                    <MenuItem onClick={handleLogRunClick} sx={{width: '11rem'}}>Log a Run</MenuItem>
                )}
            </Menu>
        </Box>
    )
}

export default DropdownBtn