import React, { useState } from 'react'
import { Button, Menu, MenuItem, Box, ButtonGroup } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useTheme } from '@mui/material/styles'

const DropdownBtn = () => {
    const [anchorEl, setAnchorEl] = useState(false)
    const open = Boolean(anchorEl)

    const theme = useTheme()

    const handleClick = () => {
        
        console.log("Start Timer clicked");
      };
    
      const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); 
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

    return (
        <Box>
      {/* Button Group for Split Button */}
        <ButtonGroup variant="contained" sx={{ backgroundColor: theme.primary, color: theme.text.secondary }}>
            {/* Main Action Button */}
            <Button
            onClick={handleClick}
            sx={{ backgroundColor: theme.primary.main, color: theme.text.secondary, width: '8rem' }}
            >
            Start Timer
            </Button>

            {/* Dropdown Button */}
            <Button
            size="small"
            onClick={handleMenuClick}
            sx={{ backgroundColor: theme.primary.main, color: theme.text.secondary, width: {xs: '1rem'} }}
            >
            <ArrowDropDownIcon />
            </Button>
        </ButtonGroup>

        {/* Dropdown Menu */}
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
            'aria-labelledby': 'dropdown-button',
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',  // Changed from 'left' to 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',  // Changed from 'left' to 'right'
              }}
        >
            <MenuItem onClick={handleMenuClose} sx={{width: '11rem'}}>Log a Run</MenuItem>
        </Menu>
    </Box>
    )
}

export default DropdownBtn