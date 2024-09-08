import React, { useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import LoginComponent from '../../components/auth-components/LoginComp';
import RunningMan from '../../assets/running-man-small.svg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * LoginPage component.
 * 
 * This component represents the login page of the application. It handles the login process by sending a POST request to the server with the user's email and password. If the login is successful, the user's token and information are stored in the local storage. If an error occurs during the login process, an error message is displayed.
 * 
 * @returns {JSX.Element} The rendered LoginPage component.
 */

const LoginPage = ({ setIsAuthenticated }) => {

    const navigate = useNavigate();
    const [LoginPageErrorMessage, setLoginPageErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    /**
     * Handles the login process.
     * 
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * @returns {Promise<void>} - A promise that resolves when the login process is complete.
     * @throws {Error} - If an error occurs during the login process, and depending on the error, a different error message will be displayed.
     */
    const handleLogin = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', { email, password });
            const userInfoResponse = await axios.get('http://localhost:8000/api/auth/user/', {
                headers: {
                    'Authorization': `Token ${response.data.key}`,
                },
            });

            localStorage.setItem('token', response.data.key);
            localStorage.setItem('userInfo', JSON.stringify(userInfoResponse.data));
            localStorage.setItem('message', `Welcome ${userInfoResponse.data.username ? userInfoResponse.data.username : userInfoResponse.data.email}`);
            
            setTimeout(() => {
                setLoading(false);
                setIsAuthenticated(true);
                navigate('/');
            }, 2000);
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                if (errorData.non_field_errors) {
                    setLoginPageErrorMessage("Incorrect credentials. Please try again.");
                } else {
                    setLoginPageErrorMessage("An unexpected error occurred. Please try again.");
                }
            } else {
                setLoginPageErrorMessage("An unexpected error occurred. Please try again.");
            } 
            setLoading(false)
        }
    } 

  return (
    
    <Box 
      sx={{
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#263238',
        padding: { xs: '1rem', sm: '2rem', md: '3rem' },
      }}
    >
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem'}}>
            <Typography sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, fontStyle: 'italic', color: '#FFD54F' }}>TrackRunner</Typography>
            <Typography><img src={RunningMan} alt="Man Running" style={{ width: '100%', maxWidth: '9.375rem' }}></img></Typography>
        </Box>

        {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CircularProgress size={60} sx={{ color: '#FFD54F' }} />
                    <Typography variant="h6" sx={{ mt: 2, color: '#FFD54F' }}>
                        Logging in, please wait...
                    </Typography>
                </Box>
            ) : (
                <LoginComponent onSubmit={handleLogin} LoginPageErrorMessage={LoginPageErrorMessage} />
            )}

    </Box>
    
  );
};

export default LoginPage;