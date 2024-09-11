import { React, useState } from 'react'
import { Box, Typography, IconButton, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DropdownBtn from './DropdownBtn'
import UserDrawer from './UserDrawer'
import Runner from '../../../assets/running-man-small.svg'
import buttonTheme from '../../../theme/dashboard_themes/buttonTheme'
import { ThemeProvider } from '@mui/material/styles'
import LogRunModal from './LogRun'

/**
 * Header component for the dashboard, handling mobile and desktop layouts.
 * @param {Object} props 
 * @param {boolean} props.isMobile - Whether the current view is mobile or not.
 * @param {Object} props.userInfo - The current user's info.
 * @param {Function} props.toggleDrawer - Function to open/close the drawer.
 * @param {boolean} props.drawerOpen - Whether the drawer is open or not.
 * @returns {JSX.Element} Header component
 */
const Header = ({ isMobile, userInfo, toggleDrawer, drawerOpen }) => {
  const [open, setOpen] = useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={buttonTheme}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'row', sm: 'column', md: 'column', lg: 'row' }, 
      width: '100%', marginTop: '1rem' }}>
        
        {/* Left side (TrackRunner {img}) */}
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
          {!isMobile && (
            <Typography sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, fontStyle: 'italic', color: '#FFD54F' }}>
              TrackRunner
            </Typography>
          )}
          <Typography>
            <img src={Runner} alt="Man Running" style={{ width: '2.9rem', height: 'auto' }} />
          </Typography>
        </Box>

        {isMobile && <DropdownBtn />}

        {/* Right side (buttons/drawer menu) */}
        {isMobile ? (
          <>
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
              <MenuIcon sx={{ color: '#FFD54F', fontSize: '4rem' }} />
            </IconButton>
            <UserDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} userInfo={userInfo} />
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: '2rem', width: { xs: '100%', sm: '100%', md: '100%', lg: '55%' }, 
          flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' }, justifyContent: 'center' }}>
            <Button variant="contained" color="primary">Start Timer</Button>
            <Button variant="contained" color="secondary" onClick={handleOpen}>Log Run</Button>
            <LogRunModal open={open} handleClose={handleClose}/>
            <Button variant="outlined" onClick={toggleDrawer(true)}>{userInfo.username}</Button>
            <UserDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} userInfo={userInfo} />
          </Box>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default Header