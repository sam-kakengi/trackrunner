import React from 'react';
import { Container } from '@mui/material';
import DashboardComponent from '../../components/core-components/DashboardComp';

/**
 * Renders the Dashboard page.
 * 
 * @returns {JSX.Element} The rendered Dashboard page.
 */

const DashboardPage = () => {
    return (
        <Container maxWidth={false} disableGutters sx={{ maxWidth: '100%', paddingLeft: '0', paddingRight: '0' }}>
            <DashboardComponent />
        </Container>
    );
};

export default DashboardPage;