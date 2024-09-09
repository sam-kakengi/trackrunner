import React from 'react'
import { Container, Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import RegisterComp from '../../components/auth/RegisterComp'
import { useState } from 'react'
import RunningMan from '../../assets/running-man-small.svg'

/**
 * RegistrationPage component.
 * 
 * This component represents the registration page of the application.
 * It allows users to register by providing their registration data.
 * 
 * @returns {JSX.Element} The rendered registration page.
 */

const RegistrationPage = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState('')

    const handleRegister = async (registrationData) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/registration/', registrationData)
            setMessage("Registration successful! Sending you to the login page...");
            setTimeout(() => {
                navigate('/')
            }, 2000);

        } catch (error) {
            setMessage("Registration failed. Please check your inputs.")
            console.error("There was an error!", error)
            if (error.response) {
                console.error("Response data:", error.response.data)
            }
        }
    };

    return (
        <Container 
            maxWidth={false} 
            sx={{ 
                height: '100vh', 
                width: '100%',
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: '#263238',
            }} 
        >
            <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', }}>
                <Typography sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, fontStyle: 'italic', color: '#FFD54F' }}>TrackRunner</Typography>
                <Typography><img src={RunningMan} alt="Man Running" style={{ width: '100%', maxWidth: '9.375rem' }}></img></Typography>
            </Box>
            <RegisterComp onRegister={handleRegister} formMessage={message} />
        </Container>
    )
}

export default RegistrationPage;