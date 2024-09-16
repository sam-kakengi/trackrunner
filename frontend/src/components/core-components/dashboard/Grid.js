import React from 'react';
import { Grid, Box, Typography } from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { CenterFocusStrong } from '@mui/icons-material';
import tileTheme from '../../../theme/dashboard_themes/tileTheme';
import axios from 'axios'

/**
 * DashboardGrid component handles the layout of cards and the table in the dashboard.
 * @returns {JSX.Element} The grid layout component
 */
const getRecentRun = async() => {
    const token = localStorage.getItem('token')
    const recentRun = await axios.get('http://localhost:8000/api/runs/recent/',
    {
        headers: {'Authorization': `Token ${token}`}
    })
    
    return recentRun
}

const DashboardGrid = () => {

    const theme = useTheme()
    
    const recentRun = getRecentRun();

    const tileBaseStyle = {textAlign: 'center', padding: '0.5rem'};
    const gridBoxStyle = {flex: 1, backgroundColor: '#e0e0e0', height: {lg: '18.75rem', sm: '14rem', xs: '11rem', md: '18.75rem'}, 
    width: {xs: '14rem'}, borderRadius: '2rem', backgroundColor: theme.secondary.main, justifyContent: 'center', padding: '1rem', paddingTop: '2rem'};

    return(
    <Grid container spacing={2} sx={{marginBottom: '1rem'}}>

                    {/* Left Section */}
                    <Grid item xs={12} md={12} lg={6} sx={{display:'flex', flexDirection:'column'}}>
                        {/* Two medium containers side by side */}
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'row', md: 'row' }, 
                        gap: {lg: '2rem', xs: '0.5rem'}, width: {md: '100%'}, marginTop: '1.5rem' }}>
                            <Box sx={gridBoxStyle}></Box>
                            <Box sx={gridBoxStyle}>
                            <ThemeProvider theme={tileTheme}>
                                <Typography sx={tileBaseStyle} variant='h6'>31:42</Typography>
                                <Typography sx={tileBaseStyle} variant='h2'>20th Aug</Typography>
                                <Typography sx={tileBaseStyle} variant='h4'>Last Run</Typography>
                                <Typography sx={tileBaseStyle} variant='h6'>The Lock</Typography>
                            </ThemeProvider>
                            </Box>
                        </Box>


                        {/* Large Table container underneath */}
                        <Box sx={{ marginTop: '2rem', backgroundColor: '#f5f5f5', height: { xs: '18.75rem', md: '25rem', lg: '25rem' }, 
                        width: {xs: '21.9375'}, borderRadius: '2rem', backgroundColor: theme.secondary.main }}>
                            

                        </Box>
                    </Grid>


                    {/* Right Section - Large Chart */}
                    <Grid item xs={12} md={12} lg={6}>
                        <Box sx={{ height: {lg: '97%', md: '25rem', sm: '20rem', xs: '18.75rem', marginTop: '1.5rem'}, 
                        width: {xs: '21.9375'}, backgroundColor: theme.secondary.main, padding: '1rem', borderRadius: '2rem' }}>

                        </Box>
                    </Grid>

    </Grid>
    )
}

export default DashboardGrid