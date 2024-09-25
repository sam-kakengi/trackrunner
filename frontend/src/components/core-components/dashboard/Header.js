import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, IconButton, Button } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DropdownBtn from './DropdownBtn'
import UserDrawer from './UserDrawer'
import Runner from '../../../assets/running-man-small.svg'
import buttonTheme from '../../../theme/dashboard_themes/buttonTheme'
import { ThemeProvider } from '@mui/material/styles'
import LogRunModal from './LogRun'
import StartRunModal from './startRunComponents/startRunModalV2'
import { useActiveRun } from '../context/ActiveRunV2'
import EndRunModal from './EndRunModal'
import PreEndRunModal from './PreEndRunModal'

const Header = ({ isMobile, userInfo, toggleDrawer, drawerOpen }) => {
  const [logRunModalOpen, setLogRunModalOpen] = useState(false)
  const [startRunModalOpen, setStartRunModalOpen] = useState(false)

  const { 
    activeRun, 
    startRun, 
    pauseRun, 
    resumeRun, 
    pausedRun, 
    setPausedRun,
    endRunModalOpen, 
    setEndRunModalOpen,
    preEndRunModalOpen,
    setPreEndRunModalOpen,
  } = useActiveRun()
  
  const pauseTimerRef = useRef(null)

  useEffect(() => {
    const storedPausedRun = localStorage.getItem('pausedRun')
    if (storedPausedRun) {
      setPausedRun(JSON.parse(storedPausedRun))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('pausedRun', JSON.stringify(pausedRun))
  }, [pausedRun])

  useEffect(() => {
    if (!activeRun?.isRunning) {
      stopPauseTimer()
      setPausedRun({ isPaused: false, pausedDuration: 0 })
      localStorage.removeItem('pausedRun')
    }
  }, [activeRun?.isRunning])

  const handleStartRunOpen = () => setStartRunModalOpen(true)
  const handleStartRunClose = () => setStartRunModalOpen(false)

  const handleEndRunClick = () => setPreEndRunModalOpen(true)

  const handlePreEndRunCancel = () => setPreEndRunModalOpen(false)

  const handleEndRunModalClose = () => setEndRunModalOpen(false)

  const handleLogRunOpen = () => setLogRunModalOpen(true)
  const handleLogRunClose = () => setLogRunModalOpen(false)

  const startPauseTimer = () => {
    if (pauseTimerRef.current) clearInterval(pauseTimerRef.current)
    pauseTimerRef.current = setInterval(() => {
      setPausedRun(prev => {
        const newPausedRun = {
          ...prev,
          pausedDuration: prev.pausedDuration + 1
        }
        localStorage.setItem('pausedRun', JSON.stringify(newPausedRun))
        return newPausedRun
      })
    }, 1000)
  }

  const stopPauseTimer = () => {
    if (pauseTimerRef.current) {
      clearInterval(pauseTimerRef.current)
      pauseTimerRef.current = null
    }
  }

  const togglePauseResume = () => {
    if (pausedRun.isPaused) {
      stopPauseTimer()
      resumeRun(pausedRun.pausedDuration)
      setPausedRun(prev => {
        const newPausedRun = { ...prev, isPaused: false }
        localStorage.setItem('pausedRun', JSON.stringify(newPausedRun))
        return newPausedRun
      })
    } else {
      startPauseTimer()
      setPausedRun(prev => {
        const newPausedRun = { ...prev, isPaused: true }
        localStorage.setItem('pausedRun', JSON.stringify(newPausedRun))
        return newPausedRun
      })
    }
  }

  useEffect(() => {
    return () => {
      stopPauseTimer()
      localStorage.removeItem('pausedRun')
    }
  }, [])

  return (
    <ThemeProvider theme={buttonTheme}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: { xs: 'row', sm: 'column', md: 'column', lg: 'row' }, 
      width: '100%', marginTop: '1rem' }}>
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
            {activeRun?.isRunning ? (
              <>
                <Button variant="contained" color="secondary" onClick={handleEndRunClick}>
                  End Run
                </Button>
                <Button variant="outlined" onClick={togglePauseResume}>
                  {pausedRun.isPaused ? 'Resume' : 'Pause'}
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" color="primary" onClick={handleStartRunOpen}>Start Timer</Button>
                <Button variant="contained" color="secondary" onClick={handleLogRunOpen}>Log Run</Button>
              </>
            )}
            <Button variant="outlined" onClick={toggleDrawer(true)}>{userInfo.username}</Button>
            <UserDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} userInfo={userInfo} />
          </Box>
        )}
      </Box>
      <PreEndRunModal 
        open={preEndRunModalOpen}
        onCancel={handlePreEndRunCancel}
      />
      <EndRunModal 
        open={endRunModalOpen}
        handleClose={handleEndRunModalClose}
      />
      <LogRunModal 
        open={logRunModalOpen} 
        handleClose={handleLogRunClose} 
      />
      <StartRunModal 
        open={startRunModalOpen} 
        handleClose={handleStartRunClose} 
        onStartRun={startRun}
      />
    </ThemeProvider>
  )
}

export default Header