import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress,
    Box, useMediaQuery, useTheme, Typography
} from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import tableTheme from '../../../../theme/dashboard_themes/tableTheme'
import DesktopNoteView from './DesktopNoteView'
import MobileNoteView from './MobileNoteView'
import TabletNoteView from './TabletNoteView'
import RouteNameTruncated from './RouteNameTrunc'

const MainTable = ({ recentRuns, awaitingRunData, error }) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
   
    const getFontSize = () => {
        if (isMobile) return '0.85rem'
        if (isTablet) return '0.875rem'
        return '1rem'
    }

    const getCellWidth = (header) => {
        if (isMobile) {
            switch (header) {
                case 'Date': return '25%'
                case 'Route': return '30%'
                case 'Time': return '25%'
                case 'Notes': return '25%'
                default: return '25%'
            }
        }
        return '20%'
    }


    const headers = isMobile ? ['Date', 'Distance', 'Time', 'Notes'] : ['Date', 'Route', 'Distance', 'Time', 'Notes']

    return (
        <ThemeProvider theme={tableTheme}>
            <Box sx={{ 
                backgroundColor: tableTheme.palette.background.main, 
                borderRadius: '1rem', 
                padding: { xs: '0.25rem', sm: '0.75rem', md: '1rem' },
                boxShadow: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)',
                height: '100%',
            }}>
                {awaitingRunData ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress sx={{ color: 'white' }} />
                    </Box>
                ) : error ? (
                    <div>{'Error loading runs'}</div>
                ) : (
                    <TableContainer component={Paper} sx={{ 
                        backgroundColor: tableTheme.palette.background.main, 
                        boxShadow: 'none', 
                        height: '100%',
                        paddingTop: { xs: '1rem', sm: '1.25rem', md: '1.75rem', lg: '2rem' }
                    }}>
                        <Table sx={{ tableLayout: 'fixed', width: '100%' }} aria-label="recent runs table">
                            <TableHead>
                                <TableRow>
                                    {headers.map((header) => (
                                        <TableCell key={header} align='center' sx={{ 
                                            width: getCellWidth(header), 
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
                                        <TableCell align='center' sx={{ padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' }, width: getCellWidth('Date') }}>
                                            <Typography sx={{ fontSize: getFontSize() }}>{run.date_formatted}</Typography>
                                        </TableCell>
                                        {!isMobile && (
                                            <RouteNameTruncated routeName={run.route.name} isMobile={isMobile} fontSize={getFontSize()} />
                                        )}
                                        <TableCell align='center' sx={{ padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' }, width: '20%' }}>
                                            <Typography sx={{ fontSize: getFontSize() }}>{run.route.distance} km</Typography>
                                        </TableCell>
                                        <TableCell align='center' sx={{ padding: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem' }, width: getCellWidth('Time') }}>
                                            <Typography sx={{ fontSize: getFontSize() }}>{run.duration_formatted}</Typography>
                                        </TableCell>
                                        {isMobile ? (
                                            <MobileNoteView note={run.notes} width={getCellWidth('Notes')} />
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
                )}
            </Box>
        </ThemeProvider>
    )
}

export default MainTable