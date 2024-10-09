import { React } from 'react'
import { Grid, Box, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import RecentRunTile from './RecentRunTile'
import PersonalBestTile from './PersonalBestTile'
import ActiveRunTile from './startRunComponents/activeRunTile'
import { useActiveRun } from '../context/ActiveRun'
import MainTable from './table_components/mainTable'
import MultiSeriesLineChart from './chart_components/LineChart'
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
        <Grid container spacing={2} sx={{ height: {lg: '85%', xs: '75%', sm: '50%', md: '85%'}, paddingTop: '1rem' }}>
            {/* Left Section */}
            <Grid item xs={12} md={12} lg={6} sx={{ display: 'flex', flexDirection: 'column', height: '100%', marginBottom: {md: '2rem', sm: '1.5rem', xs: '2rem'} }}>
                {/* Two medium containers side by side */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'row' }, 
                gap: { lg: '2rem', xs: '2rem' }, width: { md: '100%' }, height: { lg: '50%', xs: '50%'}, marginBottom: {sm: '1rem', xs: '1rem', md: '2rem', lg: '1rem'} }}>
                    <PersonalBestTile theme={theme} gridBoxStyle={gridBoxStyle} tileBaseStyle={tileBaseStyle} />
                    {activeRun?.isRunning ? (
                        <ActiveRunTile theme={theme} gridBoxStyle={gridBoxStyle} tileBaseStyle={tileBaseStyle} />
                    ) : (
                        <RecentRunTile theme={theme} gridBoxStyle={gridBoxStyle} tileBaseStyle={tileBaseStyle} />
                    )}
                </Box>
                
                {/* Large Table container underneath */}

                <Box sx={{ backgroundColor: '#f5f5f5', height: { xs: '50%', md: '50%', lg: '50%' }, 
                  width: { xs: '21.9375' }, borderRadius: '2rem', backgroundColor: theme.secondary.main }}>
                    <MainTable />
                </Box>
            </Grid>

            {/* Right Section - Large Chart */}
            <Grid item xs={12} md={12} lg={6} sx={{height: '100%', paddingBottom: {lg: '0', md: '1rem', sm:'1rem', xs: '1rem'}, marginTop: {lg: '0', md: '1rem', sm:'1rem',}}}>
                <Box sx={{ height: { lg: '100%', md: '100%', sm: '70%', xs: '70%'}, 
                width: { xs: '21.9375' }, backgroundColor: theme.secondary.main, padding: '1rem', borderRadius: '2rem',
                 }}>
                    <MultiSeriesLineChart />
                </Box>
            </Grid>
        </Grid>
    )
}

export default DashboardGrid
