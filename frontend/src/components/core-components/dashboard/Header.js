import React, { useState, useRef, useEffect } from 'react'
import { Box, Typography, IconButton, Button, CircularProgress, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DropdownBtn from './DropdownBtn'
import UserDrawer from './UserDrawer'
import Runner from '../../../assets/running-man-small.svg'
import buttonTheme from '../../../theme/dashboard_themes/buttonTheme'
import { ThemeProvider } from '@mui/material/styles'
import LogRunModal from './LogRun'
import StartRunModal from './startRunComponents/startRunModal'
import { useActiveRun } from '../context/ActiveRun'
import EndRunModal from './EndRunModal'
import PreEndRunModal from './PreEndRunModal'
import { red, green, grey, yellow } from '@mui/material/colors'

const Header = ({ isMobile, userInfo, toggleDrawer, drawerOpen }) => {
  const [logRunModalOpen, setLogRunModalOpen] = useState(false)
  const [startRunModalOpen, setStartRunModalOpen] = useState(false)
  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

  const imageWidth = isTablet ? '3rem' : '4rem'

  const { 
    activeRun, 
    startRun,  
    resumeRun, 
    pausedRun, 
    setPausedRun,
    endRunModalOpen, 
    setEndRunModalOpen,
    preEndRunModalOpen,
    setPreEndRunModalOpen,
    isLoading,
  } = useActiveRun()
  
  const pauseTimerRef = useRef(null)

  useEffect(() => {
    const storedPausedRun = localStorage.getItem('pausedRun')
    if (storedPausedRun) {
      const parsedPausedRun = JSON.parse(storedPausedRun)
      setPausedRun(parsedPausedRun)
      if (parsedPausedRun.isPaused) {
        startPauseTimer(parsedPausedRun.pausedDuration)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('pausedRun', JSON.stringify(pausedRun))
  }, [pausedRun])

  useEffect(() => {
    if (!isLoading) { 
      if (activeRun?.isRunning === false) {
        stopPauseTimer()
        setPausedRun({ isPaused: false, pausedDuration: 0 })
        localStorage.removeItem('pausedRun')
      } else if (activeRun?.isRunning === true && !pausedRun.isPaused) {
        stopPauseTimer()
      } else if (activeRun?.isRunning === true && pausedRun.isPaused) {
        startPauseTimer(pausedRun.pausedDuration)
      }
    }
  }, [isLoading, activeRun?.isRunning, pausedRun.isPaused])

  const handleStartRunOpen = () => setStartRunModalOpen(true)
  const handleStartRunClose = () => setStartRunModalOpen(false)
  const handleEndRunClick = () => setPreEndRunModalOpen(true)
  const handlePreEndRunCancel = () => setPreEndRunModalOpen(false)
  const handleEndRunModalClose = () => setEndRunModalOpen(false)
  const handleLogRunOpen = () => setLogRunModalOpen(true)
  const handleLogRunClose = () => setLogRunModalOpen(false)

  const startPauseTimer = (initialDuration = 0) => {
    if (pauseTimerRef.current) clearInterval(pauseTimerRef.current)
    
    const startTime = Date.now() - initialDuration * 1000
    
    pauseTimerRef.current = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
      setPausedRun(prev => ({
        ...prev,
        pausedDuration: elapsedSeconds
      }))
    }, 1000)
  }

  const stopPauseTimer = () => {
    if (pauseTimerRef.current) {
      clearInterval(pauseTimerRef.current)
      pauseTimerRef.current = null
    }
  }

  const togglePauseResume = async () => {
    if (pausedRun.isPaused) {
      stopPauseTimer()
      try {
        await resumeRun(pausedRun.pausedDuration)
        setPausedRun(prev => ({
          ...prev,
          isPaused: false,
          pausedDuration: 0
        }))
      } catch (error) {
        console.error('Failed to resume run:', error)
        startPauseTimer(pausedRun.pausedDuration)
      }
    } else {
      startPauseTimer()
      setPausedRun(prev => ({
        ...prev,
        isPaused: true
      }))
    }
  }

  useEffect(() => {
    return () => {
      stopPauseTimer()
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
            <img src={Runner} alt="Man Running" style={{ width: imageWidth, height: 'auto' }} />
          </Typography>
        </Box>

        {isMobile && <DropdownBtn 
          handleStartRunOpen={handleStartRunOpen} 
          handleLogRunOpen={handleLogRunOpen}
          handleEndRunClick={handleEndRunClick}
          togglePauseResume={togglePauseResume}
          activeRun={activeRun}
          pausedRun={pausedRun}
          isLoading={isLoading}
        />}

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
            {isLoading ? (
              <CircularProgress />
            ) : activeRun?.isRunning ? (
              <>
                <Button variant="contained" onClick={handleEndRunClick} sx={{backgroundColor: red[400], color: 'white', 
                  '&:hover': {
                  backgroundColor: red[500], 
                  
                },
                }}>
                  End Run
                </Button>
                <Button variant="contained" onClick={togglePauseResume} sx={{backgroundColor: pausedRun.isPaused ? `${green[700]} !important` : `${grey[200]} !important`,
                  color: pausedRun.isPaused ? 'white' : '#37474F', 
                  '&:hover': {
                  backgroundColor: pausedRun.isPaused
                    ? `${green[800]} !important`
                    : `${grey[700]} !important`, 
                  color: pausedRun.isPaused ? 'white' : 'white', 
                },
                }}>
                  {pausedRun.isPaused ? 'Resume' : 'Pause'}
                </Button>
              </>
            ) : (
              <>
                <Button variant="contained" sx={{backgroundColor: '#FFD54F', color: '#263238'}}onClick={handleStartRunOpen}>Start Timer</Button>
                <Button variant="contained" sx={{backgroundColor: grey['A200'], color: '#263238'}} onClick={handleLogRunOpen}>Log Run</Button>
              </>
            )}
            <Button variant="outlined" sx={{ color: yellow[600], border: '1px solid #FFD54F !important'}} onClick={toggleDrawer(true)}>{userInfo.username}</Button>
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