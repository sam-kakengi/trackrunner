import { React, useState } from 'react'
import { Box, Typography, IconButton, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DropdownBtn from './DropdownBtn'
import UserDrawer from './UserDrawer'
import Runner from '../../../assets/running-man-small.svg'
import buttonTheme from '../../../theme/dashboard_themes/buttonTheme'
import { ThemeProvider } from '@mui/material/styles'
import LogRunModal from './LogRun'
import StartRunModal from './startRunComponents/startRunModal'
import { useActiveRun } from '../context/ActiveRunContext'
import EndRunModal from './EndRunModal'

const Header = ({ isMobile, userInfo, toggleDrawer, drawerOpen }) => {
  const [open, setOpen] = useState(false);
  const [startRunModalOpen, setStartRunModalOpen] = useState(false)
  const [endRunModalOpen, setEndRunModalOpen] = useState(false)

  const { activeRun, startRun, endRun, pauseRun, resumeRun } = useActiveRun(); // Get activeRun and context functions

  const handleStartRunOpen = () => {
    setStartRunModalOpen(true)
  }

  const handleStartRunClose = () => {
    setStartRunModalOpen(false)
  }

  const handleEndRunOpen = () => {
    setEndRunModalOpen(true)
  }

  const handleEndRunClose = () => { 
    setEndRunModalOpen(false)
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const togglePauseResume = () => {
    if (activeRun.isPaused) {
      resumeRun()
    } else {
      pauseRun()
    }
  }

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
            {activeRun.isRunning ? (
              <>
                <Button variant="contained" color="secondary" onClick={handleEndRunOpen}>
                  End Run
                </Button>
                <Button variant="outlined" onClick={togglePauseResume}>
                  {activeRun.isPaused ? 'Resume' : 'Pause'}
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" color="primary" onClick={handleStartRunOpen}>Start Timer</Button>
                <StartRunModal 
                  open={startRunModalOpen} 
                  handleClose={handleStartRunClose} 
                  onStartRun={startRun}
                />
                <Button variant="contained" color="secondary" onClick={handleOpen}>Log Run</Button>
                <LogRunModal open={open} handleClose={handleClose} />
              </>
            )}
            <Button variant="outlined" onClick={toggleDrawer(true)}>{userInfo.username}</Button>
            <UserDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} userInfo={userInfo} />
          </Box>
        )}
      </Box>
      <EndRunModal open={endRunModalOpen} handleClose={handleEndRunClose} />
    </ThemeProvider>
  )
}

export default Header