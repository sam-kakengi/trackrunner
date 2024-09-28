import { React } from 'react'
import { Grid, Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import RecentRunTile from './RecentRunTile'
import PersonalBestTile from './PersonalBestTile'
import ActiveRunTile from './startRunComponents/activeRunTile'
import { useActiveRun } from '../context/ActiveRun'
import MainTable from './table_components/mainTable'

/**
 * DashboardGrid component handles the layout of cards and the table in the dashboard.
 * @returns {JSX.Element} The grid layout component
 */
const DashboardGrid = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const tileBaseStyle = { textAlign: 'center', padding: isMobile ? '0.3rem' : 'inherit' };
    const gridBoxStyle = {
        flex: 1,
        height: { lg: '18.75rem', sm: '14rem', xs: '11rem', md: '18.75rem' },
        width: { xs: '14rem' },
        borderRadius: '2rem',
        backgroundColor: theme.secondary.main,
        justifyContent: 'center',
        padding: '1rem',
        flexDirection: 'column',
        display: 'flex'
    }

    const { activeRun } = useActiveRun()

    return (
        <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
            {/* Left Section */}
            <Grid item xs={12} md={12} lg={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                {/* Two medium containers side by side */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'row' }, 
                gap: { lg: '2rem', xs: '0.5rem' }, width: { md: '100%' }, marginTop: '1.5rem' }}>
                    <PersonalBestTile theme={theme} gridBoxStyle={gridBoxStyle} tileBaseStyle={tileBaseStyle} />
                    {activeRun?.isRunning ? (
                        <ActiveRunTile theme={theme} gridBoxStyle={gridBoxStyle} tileBaseStyle={tileBaseStyle} />
                    ) : (
                        <RecentRunTile theme={theme} gridBoxStyle={gridBoxStyle} tileBaseStyle={tileBaseStyle} />
                    )}
                </Box>
                
                {/* Large Table container underneath */}
                <Box sx={{ marginTop: '2rem', backgroundColor: '#f5f5f5', height: { xs: '18.75rem', md: '25rem', lg: '25rem' }, 
                width: { xs: '21.9375' }, borderRadius: '2rem', backgroundColor: theme.secondary.main }}>
                    <MainTable />
                </Box>
            </Grid>

            {/* Right Section - Large Chart */}
            <Grid item xs={12} md={12} lg={6}>
                <Box sx={{ height: { lg: '97%', md: '25rem', sm: '20rem', xs: '18.75rem', marginTop: '1.5rem' }, 
                width: { xs: '21.9375' }, backgroundColor: theme.secondary.main, padding: '1rem', borderRadius: '2rem' }}>
                </Box>
            </Grid>
        </Grid>
    )
}

export default DashboardGrid
