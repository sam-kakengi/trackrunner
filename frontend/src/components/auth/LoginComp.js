import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, Divider, Link, Alert, Card, CardContent

 } from '@mui/material';
import { Email, Lock, Check as CheckIcon } from '@mui/icons-material';
import validateLoginForm from '../../validations/LoginFormValidation';


const LoginComponent = ({ onSubmit, LoginPageErrorMessage }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [logoutAlert, setLogoutAlert] = useState(false);
    

    useEffect(() => {
        if (localStorage.getItem('logoutAlert')) {
            setLogoutAlert(true);
            setTimeout(() => {
                setLogoutAlert(false);
                localStorage.removeItem('logoutAlert');
            }, 2000);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


        const { isValid, errors } = validateLoginForm(email, password);

        if (!isValid) {
            setEmailError(errors.email);
            setPasswordError(errors.password);
            setFormErrorMessage("Please provide valid email and password.");
            return;
        }

        setFormErrorMessage(''); 
        onSubmit(email, password);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError(''); 
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (passwordError) setPasswordError('');
    };

    return (
        <Card 
        sx={{ 
            maxWidth: '40rem', 
            width: '100%',
            backgroundColor: 'white', 
            borderRadius: '0.5rem', 
            padding: '2rem', 
            boxShadow: 3,
        }}
        >
        <CardContent>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <TextField
                        label="Email Address"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        error={Boolean(emailError)}
                        helperText={emailError}
                        fullWidth
                        sx={{ marginBottom: '1.5rem' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={handlePasswordChange}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                        fullWidth
                        sx={{ marginBottom: '1.5rem' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                    />
                <Button 
                    type="submit" 
                    variant="contained" 
                    fullWidth
                    sx={{ 
                    backgroundColor: '#FFD700', 
                    color: 'black', 
                    '&:hover': { backgroundColor: '#FFC700' },
                    padding: '0.75rem',
                    '@media (max-width: 600px)': {
                        padding: '0.6rem',
                    }
                    }}
                >
                    SIGN IN
                </Button>
                {logoutAlert && <Alert 
                    icon={<CheckIcon fontSize="inherit" />} 
                    severity="success"
                    sx={{ margin: 'auto' }}
                >
                    You have successfully logged out.
                </Alert>}
                
                <Typography sx={{ color: 'red', textAlign: 'center' }}>
                    {formErrorMessage || LoginPageErrorMessage}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: { xs: '0.8rem', sm: '1rem'} }}>
                    <Link href="/register" underline="hover" sx={{ color: '#263238'}}>Create Account</Link>
                    <Link href="#" underline="hover" sx={{ color: '#263238'}}>Forgot Password?</Link>
                </Box>
            </Box>
        </CardContent>
        </Card>
    );
};

export default LoginComponent;
