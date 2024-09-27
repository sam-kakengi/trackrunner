import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,
    Box, useMediaQuery, useTheme
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import tableTheme from '../../../../theme/dashboard_themes/tableTheme'
import RunningAPI from '../../../../utilities/apiClient'
import { formatDurationSecondsMinutes, formatDate } from '../../../../utilities/timeUtil'
import DesktopNoteView from './DesktopNoteView'
import MobileNoteView from './MobileNoteView'


const MainTable = () => {
    const [recentRuns, setRecentRuns] = useState([])
    const [awaitingRunData, setAwaitingRunData] = useState(true)
    const [error, setError] = useState(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))

    useEffect(() => {
        const fetchRecentRuns = async () => {
            try {
                const api = new RunningAPI()
                const allRuns = await api.getData('run')
                
                const sortedRuns = allRuns.sort((a, b) => new Date(b.finished) - new Date(a.finished))
                const recentRuns = sortedRuns.slice(0, 5)
                setRecentRuns(recentRuns)
                setAwaitingRunData(false)
            } catch (err) {
                console.error('Error fetching recent runs:', err)
                setError('Failed to load recent runs. Please try again later.')
                setAwaitingRunData(false)
            }
        }

        fetchRecentRuns()
    }, [])

    if (awaitingRunData) {
        return <CircularProgress />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <ThemeProvider theme={tableTheme}>
            <Box sx={{ 
                backgroundColor: tableTheme.palette.background.main, 
                borderRadius: '1rem', 
                padding: '2rem',
                boxShadow: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)',
                height: '100%',
            }}>
                <TableContainer component={Paper} sx={{ backgroundColor: tableTheme.palette.background.main, boxShadow: 'none', height: '100%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="recent runs table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' sx={{ width: '20%' }}>Date</TableCell>
                                <TableCell align='center' sx={{ width: '20%' }}>Distance</TableCell>
                                <TableCell align='center' sx={{ width: '20%' }}>Route</TableCell>
                                <TableCell align='center' sx={{ width: '20%' }}>Time</TableCell>
                                <TableCell align='center' sx={{ width: '20%' }}>Notes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recentRuns.map((run) => (
                                <TableRow key={run.id}>
                                    <TableCell align='center'>{formatDate(run.finished)}</TableCell>
                                    <TableCell align='center'>{run.route.distance} km</TableCell>
                                    <TableCell align='center'>{run.route.name}</TableCell>
                                    <TableCell align='center'>{formatDurationSecondsMinutes(run.duration)}</TableCell>
                                    {isMobile ? (
                                        <MobileNoteView note={run.notes} />
                                    ) : isTablet ? (
                                        <MobileNoteView note={run.notes} />
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