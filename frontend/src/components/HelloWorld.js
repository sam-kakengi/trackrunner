import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import RunnerImage from '../assets/running-mountain.jpg';  

const HelloWorld = () => {
    return (
        <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Box textAlign="center">
                <Typography variant="h4" component="div">
                    Hello World
                </Typography>
                <img src={RunnerImage} alt="Runner" style={{ width: '45.375rem', marginBottom: '1.25rem', height: '25rem' }} />
            </Box>
        </Container>
    );
};

export default HelloWorld;