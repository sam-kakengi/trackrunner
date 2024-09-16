import React, { useState } from 'react'
import { Button, Menu, MenuItem, Box, ButtonGroup } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { useTheme } from '@mui/material/styles'
import LogRunModal from './LogRun'

const DropdownBtn = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const theme = useTheme()

    const [logRunOpen, logRunSetOpen] = useState(false);

    const logRunhandleOpen = () => {
      logRunSetOpen(true);
    };

    const logRunhandleClose = () => {
      logRunSetOpen(false);
    };

    const handleClick = () => {
        
        console.log("Start Timer clicked");
      };
    
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget); 
      };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
        
      };

    const handleLogRunClick = () => {
        logRunhandleOpen();
        handleMenuClose();
      };

    return (
        <Box>
      {/* Button Group for Split Button */}
        <ButtonGroup variant="contained" sx={{ backgroundColor: theme.primary, color: theme.text.secondary, height: '2.3rem'  }}
        >
            {/* Main Action Button */}
            <Button
            onClick={handleClick}
            sx={{ backgroundColor: theme.primary.main, color: theme.text.secondary, width: '8rem', height: '100%'  }}
            >
            Start Timer
            </Button>

            {/* Dropdown Button */}
            <Button
            size="small"
            onClick={handleMenuClick}
            sx={{ backgroundColor: theme.primary.main, color: theme.text.secondary, width: {xs: '1rem'}, height: '100%' }}
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
            <MenuItem onClick={handleLogRunClick} sx={{width: '11rem',}}  >Log a Run</MenuItem>
            
        </Menu>

        <LogRunModal open={logRunOpen} handleClose={logRunhandleClose}/>
    </Box>
    )
}

export default DropdownBtn