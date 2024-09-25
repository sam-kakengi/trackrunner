import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import tileTheme from '../../../../theme/dashboard_themes/tileTheme'
import { useActiveRun } from '../../context/ActiveRunV2'
import { blueGrey } from '@mui/material/colors'

const ActiveRunTile = ({ theme, gridBoxStyle, tileBaseStyle }) => {
    const { activeRun, pausedRun, endRunModalOpen, preEndRunModalOpen } = useActiveRun()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [elapsedTime, setElapsedTime] = useState(0)
    const timerRef = useRef(null)

    useEffect(() => {
        if (activeRun?.isRunning && !pausedRun.isPaused && !endRunModalOpen && !preEndRunModalOpen) {
            const startTime = localStorage.getItem('runStartTime')
            const storedPausedDuration = localStorage.getItem('pausedDuration')
            
            if (startTime) {
                const updateElapsedTime = () => {
                    const now = new Date().getTime()
                    const totalElapsed = Math.floor((now - parseInt(startTime)) / 1000)
                    const pausedDuration = storedPausedDuration ? parseInt(storedPausedDuration) : 0
                    setElapsedTime(totalElapsed - pausedDuration)
                }

                updateElapsedTime()
                timerRef.current = setInterval(updateElapsedTime, 1000)
            }
        } else {
            clearInterval(timerRef.current)
        }

        return () => clearInterval(timerRef.current)
    }, [activeRun?.isRunning, pausedRun.isPaused, endRunModalOpen, preEndRunModalOpen])

    useEffect(() => {
        if (pausedRun.isPaused) {
            localStorage.setItem('pausedDuration', pausedRun.pausedDuration.toString())
        }
    }, [pausedRun.isPaused, pausedRun.pausedDuration])

    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 3600)
        const minutes = Math.floor((duration % 3600) / 60)
        const seconds = duration % 60
      
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    return (
        <Box sx={gridBoxStyle}>
            <ThemeProvider theme={tileTheme}>
                {activeRun?.isRunning ? (
                    <>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>Active Run</Typography>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'h5' : 'h4'}>
                            {formatDuration(elapsedTime)}
                        </Typography>
                        {pausedRun.isPaused || endRunModalOpen || preEndRunModalOpen ? ( 
                            <Typography sx={tileBaseStyle} variant={isMobile ? 'h5' : 'h4'} color={blueGrey[500]}>
                                {endRunModalOpen || preEndRunModalOpen ? 'Ending...' : 'Paused'}
                            </Typography>
                        ) : (
                            <Typography sx={tileBaseStyle} variant={isMobile ? 'h5' : 'h4'}>
                                In Progress
                            </Typography>
                        )}
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>
                            {activeRun.routeName || 'No route'}
                        </Typography>
                    </>
                ) : (
                    <Typography sx={{ ...tileBaseStyle, textAlign: 'center' }} variant='h4'>No active run</Typography>
                )}
            </ThemeProvider>
        </Box>
    )
}

export default ActiveRunTile