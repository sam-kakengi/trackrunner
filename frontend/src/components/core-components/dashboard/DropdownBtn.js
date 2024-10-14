import React, { useState } from 'react'
import { Button, Menu, MenuItem, Box, ButtonGroup } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useTheme } from '@mui/material/styles'
import { green, grey, red, blueGrey } from '@mui/material/colors'

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
            <ButtonGroup variant="contained" sx={{ backgroundColor: theme.primary, color: theme.text.secondary, height: '2.3rem', width: '10rem' }}>
                <Button
                    onClick={handleClick}
                    sx={{
                    backgroundColor: activeRun?.isRunning
                        ? pausedRun.isPaused
                        ? `${green[700]} !important`
                        : `${grey[700]} !important` 
                        : theme.primary.main, 
                    color: theme.text.secondary,
                    width: '10rem',
                    height: '100%',
                    fontSize: '0.8rem',
                    borderRight: `1px solid ${blueGrey['A400']} !important`,
                    border: 'none',
                    }}
                    disabled={isLoading}
                >
                    {activeRun?.isRunning 
                    ? (pausedRun.isPaused ? 'Resume' : 'Pause') 
                    : 'Start Timer'}
                </Button>

                <Button
                    size="small"
                    onClick={handleMenuClick}
                    sx={{
                        backgroundColor: activeRun?.isRunning
                        ? pausedRun.isPaused
                          ? `${green[700]} !important`
                          : `${grey[700]} !important` 
                        : theme.primary.main,
                    color: theme.text.secondary,
                    width: { xs: '1rem' },
                    height: '100%',
                    border: 'none',
                    }}
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
                    <MenuItem onClick={handleEndRunClickWrapper} sx={{width: '10rem', backgroundColor: red[500]}}>End Run</MenuItem>
                ) : (
                    <MenuItem onClick={handleLogRunClick} sx={{width: '10rem'}}>Log a Run</MenuItem>
                )}
            </Menu>
        </Box>
    )
}

export default DropdownBtn