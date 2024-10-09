import React from 'react'
import { Container } from '@mui/material'
import DashboardComponent from '../../components/core-components/dashboard/DashboardComp'

/**
 * Renders the Dashboard page.
 * 
 * @returns {JSX.Element} The rendered Dashboard page.
 */

const DashboardPage = ({setIsAuthenticated}) => {
    return (
        <Container maxWidth={false} disableGutters sx={{ maxWidth: '100%', height: '100vh', backgroundColor: '#263238', padding: '0', margin: '0'}}>
            <DashboardComponent setIsAuthenticated={setIsAuthenticated}/>
        </Container>
    )
}

export default DashboardPage