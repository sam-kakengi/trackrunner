import React, { useState, useEffect, useRef } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import activeRunTileTheme from '../../../../theme/dashboard_themes/activeRunTileTheme'
import { useActiveRun } from '../../context/ActiveRun'
import { blueGrey } from '@mui/material/colors'
import { formatDuration } from '../../../../utilities/timeUtil'

const ActiveRunTile = ({ theme, gridBoxStyle, tileBaseStyle }) => {
    const { activeRun, pausedRun, endRunModalOpen, preEndRunModalOpen } = useActiveRun()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [elapsedTime, setElapsedTime] = useState(() => {
        return parseInt(localStorage.getItem('elapsedTime') || '0')
    })
    const timerRef = useRef(null)

    useEffect(() => {
        if (activeRun?.isRunning && !pausedRun.isPaused && !endRunModalOpen && !preEndRunModalOpen) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prevTime => {
                    const newTime = prevTime + 1
                    localStorage.setItem('elapsedTime', newTime.toString())
                    return newTime
                })
            }, 1000)
        } else {
            clearInterval(timerRef.current)
        }

        return () => clearInterval(timerRef.current)
    }, [activeRun?.isRunning, pausedRun.isPaused, endRunModalOpen, preEndRunModalOpen])

   

    return (
        <ThemeProvider theme={activeRunTileTheme}>
            <Box sx={{ ...gridBoxStyle, backgroundColor: activeRunTileTheme.palette.primary.main }}>
                {activeRun?.isRunning ? (
                    <>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>Active</Typography>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'h5' : 'h2'}>
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
            </Box>
        </ThemeProvider>
    )
}

export default ActiveRunTile