import React, { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useTheme } from '@mui/material/styles'

const DropdownBtn = () => {
    const [anchorEl, setAnchorEl] = useState(false)
    const open = Boolean(anchorEl)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
        console.log('Current theme:', theme)
    }

    const theme = useTheme()

    const handleClose = () => {
        setAnchorEl(null)
    };

    return (
        <div>
            <Button
                id="dropdown-button"
                aria-controls={open ? 'dropdown-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
                sx={{ backgroundColor: theme.primary, 
                    color: theme.text.secondary, 
                    width: '10rem' }}
            >
                Start Timer
                <ArrowDropDownIcon sx={{ marginLeft: '0.5rem', marginBottom: '0.3rem' }} />
            </Button>
            <Menu
                id="dropdown-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'dropdown-button',
                }}
        
            >
                <MenuItem onClick={handleClose} sx={{ width: '10rem' }}>Log Run</MenuItem>
            </Menu>
        </div>
    )
}

export default DropdownBtn