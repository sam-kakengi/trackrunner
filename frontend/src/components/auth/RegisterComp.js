import React, { useState } from 'react';
import { TextField, Button, Box, Typography, InputAdornment, Link, Container, Checkbox, FormControlLabel } from '@mui/material';
import { Email, Person, Lock } from '@mui/icons-material';
import validateEmail from '../../validations/EmailValidation';
import validatePassword from '../../validations/PasswordValidation';

/**
 * RegisterPage component.
 * 
 * @param {Object} props - The component props.
 * @param {Function} props.onRegister - The function to be called when the form is submitted.
 * @param {string} props.formMessage - The message to be displayed below the form.
 * @returns {JSX.Element} The rendered RegisterPage component.
 */

const RegisterPage = ({ onRegister, formMessage }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [termsError, setTermsError] = useState('');

    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError('');
        setUsernameError('');
        setPasswordError('');
        setConfirmPasswordError('');

        let valid = true;

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        }
    
        if (!username) {
            setUsernameError('Username is required');
            valid = false;
        }
    
        if (!password1) {
            setPasswordError('Password is required');
            valid = false;
        } else if (!validatePassword(password1)) {
            setPasswordError('Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number.');
            valid = false;
        }
        
        if (!password2) {
            setConfirmPasswordError('Please confirm your password');
            valid = false;
        } else if (password1 !== password2) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        }

        if (!termsAccepted) {
            setTermsError('You must accept the terms and conditions');
            valid = false;
          }
    
        if (valid) {
            
            onRegister({
                email,
                username,
                password1,
                password2
            });
        }
    };

    return (

        <Container maxWidth={false} sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', 
        alignItems: 'center', }}>
     
            <Box
                sx={{
                    backgroundColor: '#fff',
                    padding: '2.5rem',
                    borderRadius: '0.5rem',
                    boxShadow: '0rem 0rem 0.625rem rgba(0, 0, 0, 0.1)',
                    maxWidth: '45rem',
                    width: '100%',
                }}
            >
                    
                <form onSubmit={handleSubmit}>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem',  }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (emailError) setEmailError('');
                            }}
                            error={Boolean(emailError)}
                            helperText={emailError}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Email />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (usernameError) setUsernameError('');
                            }}
                            error={Boolean(usernameError)}
                            helperText={usernameError}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password1}
                            onChange={(e) => {
                                setPassword1(e.target.value);
                                if (passwordError) setPasswordError('');
                            }}
                            error={Boolean(passwordError)}
                            helperText={passwordError}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            value={password2}
                            onChange={(e) => {
                                setPassword2(e.target.value);
                                if (confirmPasswordError) setConfirmPasswordError('');
                            }}
                            error={Boolean(confirmPasswordError)}
                            helperText={confirmPasswordError}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <FormControlLabel
                        control={
                            <Checkbox
                            checked={termsAccepted}
                            onChange={(e) => {
                                setTermsAccepted(e.target.checked);
                                if (e.target.checked) {
                                  setTermsError(''); 
                                }
                              }}
                            color="primary"
                            />
                        }
                        label={
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '0.75rem',
                                        sm: '1rem' 
                                    }
                                }}
                            >
                                I accept the Terms and Conditions
                            </Typography>
                        }
                        />
                        {termsError && <Typography color="error" sx={{ margin: 'auto' }}>{termsError}</Typography>}

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                padding: '0.625rem 0',
                                fontSize: '1rem',
                                color: 'black',
                                backgroundColor: '#FFD54F',
                                '&:hover': {
                                    backgroundColor: '#263238',
                                    color: 'white',
                                },
                            }}
                        >
                            Create account
                        </Button>

                        <Link href="/" sx={{ color: '#007BFF', display: 'block', marginTop: '1rem', textAlign: 'center' }}>
                            Already have an account?
                        </Link>
                    </Box>
                </form>

                {formMessage && (
                    <Typography variant="body1" sx={{ marginTop: '1.5rem', color: '#ff3333', textAlign: 'center', fontWeight: '900' }}>
                        {formMessage}
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default RegisterPage;