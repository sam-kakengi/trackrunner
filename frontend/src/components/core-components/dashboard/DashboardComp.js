import React, { useState } from 'react'
import {  Container, } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import DrawerTheme from '../../../theme/dashboard_themes/drawerTheme'
import { ThemeProvider } from '@mui/material/styles'
import Header from './Header'
import DashboardGrid from './Grid'

/**
 * DashboardComponent is a functional component that renders a dashboard with various cards and features.
 * 
 *
 * @returns {JSX.Element} The rendered DashboardComponent
 */

const DashboardComponent = ({setIsAuthenticated}) => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || { username: 'Guest' }

    const [drawerOpen, setDrawerOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width:600px)')

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open)
    };

    return (
        
        {/* Drawer Theme */},
        <ThemeProvider theme={DrawerTheme}>
            {/* Main Container */}
            <Container maxWidth={false} disableGutters sx={{ height: '100%', overflow:'auto', backgroundColor: '#263238', width: '100%',
                paddingLeft: {
                    xs: '1rem', 
                    sm: '2rem',  
                    md: '3rem',  
                    lg: '3rem', 
                  },
                  paddingRight: {
                    xs: '1rem',
                    sm: '2rem',
                    md: '3rem',
                    lg: '4rem',
                  },
                  paddingBottom: {
                    xs: '1rem',
                    sm: '2rem',
                    md: '3rem',
                    lg: '4rem',
                  }, paddingTop: '0', margin: '0'
             }}>

                {/* Header Component */}
                <Header isMobile={isMobile} userInfo={userInfo} toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} />
                
                {/* Grid Component */}
                <DashboardGrid />

            </Container>
    </ThemeProvider>

    )
}

export default DashboardComponent