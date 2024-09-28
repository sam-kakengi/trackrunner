import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,
    Box, useMediaQuery, useTheme, Typography, Tooltip
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import tableTheme from '../../../../theme/dashboard_themes/tableTheme'
import RunningAPI from '../../../../utilities/apiClient'
import { formatDurationSecondsMinutes, formatDate } from '../../../../utilities/timeUtil'
import DesktopNoteView from './DesktopNoteView'
import MobileNoteView from './MobileNoteView'
import TabletNoteView from './TabletNoteView'


const MainTable = () => {
    const [recentRuns, setRecentRuns] = useState([])
    const [awaitingRunData, setAwaitingRunData] = useState(true)
    const [error, setError] = useState(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
   

    const getFontSize = () => {
        
        if (isTablet) return '0.875rem'
        return '1rem';
    }

    useEffect(() => {
        const fetchRecentRuns = async () => {
            const api = new RunningAPI()
            const allRuns = await api.getData('run')
            
            if (allRuns === null) {
                setError('Failed to load recent runs. Please try again later.')
            } else {
                const sortedRuns = allRuns.sort((a, b) => new Date(b.finished) - new Date(a.finished))
                const recentRuns = sortedRuns.slice(0, 5)
                setRecentRuns(recentRuns)
            }
            setAwaitingRunData(false)
        }
    
        fetchRecentRuns()
    }, [])

    if (awaitingRunData) {
        return <CircularProgress />
    }

    if (error) {
        return <div>{'Error loading runs'}</div>
    }

    return (
        <ThemeProvider theme={tableTheme}>
            <Box sx={{ 
                backgroundColor: tableTheme.palette.background.main, 
                borderRadius: '1rem', 
                padding: { xs: '0.25rem', sm: '0.75rem', md: '1rem' },
                boxShadow: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)',
                height: '100%',
            }}>
                <TableContainer component={Paper} sx={{ 
                    backgroundColor: tableTheme.palette.background.main, 
                    boxShadow: 'none', 
                    height: '100%',
                    paddingTop: { xs: 0, sm: '1.25rem', md: '1.75rem', lg: '2rem' }
                }}>
                    <Table sx={{ tableLayout: 'fixed', width: '100%' }} aria-label="recent runs table">
                        <TableHead>
                            <TableRow>
                                {['Date', 'Distance', 'Route', 'Time', 'Notes'].map((header) => (
                                    <TableCell key={header} align='center' sx={{ 
                                        width: '20%', 
                                        padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' },
                                        '&:last-child': { paddingRight: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' } }
                                    }}>
                                        <Typography sx={{ fontSize: getFontSize() }}>{header}</Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentRuns.map((run) => (
                                <TableRow key={run.id}>
                                    <TableCell align='center' sx={{ padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' } }}>
                                        <Typography sx={{ fontSize: getFontSize() }}>{formatDate(run.finished)}</Typography>
                                    </TableCell>
                                    <TableCell align='center' sx={{ padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' } }}>
                                        <Typography sx={{ fontSize: getFontSize() }}>{run.route.distance} km</Typography>
                                    </TableCell>
                                    <TableCell align='center' sx={{ padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' } }}>
                                        {isMobile ? (
                                            <Typography sx={{ fontSize: getFontSize() }}>{run.route.name}</Typography>
                                        ) : (
                                            <Tooltip title={run.route.name}>
                                                <Typography sx={{ 
                                                    fontSize: getFontSize(),
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis'
                                                }}>
                                                    {run.route.name}
                                                </Typography>
                                            </Tooltip>
                                        )}
                                    </TableCell>
                                    <TableCell align='center' sx={{ padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' } }}>
                                        <Typography sx={{ fontSize: getFontSize() }}>{formatDurationSecondsMinutes(run.duration)}</Typography>
                                    </TableCell>
                                    {isMobile ? (
                                        <MobileNoteView note={run.notes} />
                                    ) : isTablet ? (
                                        <TabletNoteView note={run.notes} />
                                    ) : (
                                        <DesktopNoteView note={run.notes} />
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ThemeProvider>
    )
}

export default MainTable