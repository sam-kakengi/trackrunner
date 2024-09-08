import React, { useState, useEffect } from 'react';
import { 
    Alert, 
    AlertTitle, 
    IconButton, 
    Box, 
    Typography, 
    Zoom 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * LoginAlert component displays a success message when a user successfully signs in.
 * 
 * @returns {JSX.Element} The rendered LoginAlert component.
 */

const LoginAlert = () => {
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [open, setOpen] = useState(true); 

    const handleClose = () => {
        setOpen(false); 
    };

    useEffect(() => {
        
        const loginMessage = localStorage.getItem('message');

        if (loginMessage) {
            setMessage(loginMessage);
            setShowMessage(true);

            // Clear the message after 3 seconds
            const timer = setTimeout(() => {
                setShowMessage(false);
                setOpen(false);
                localStorage.removeItem('message');
            }, 3000);

            return () => clearTimeout(timer); 
        }
    }, []);

    return (
        <Zoom in={showMessage && open}>
            <Alert 
                icon={false} 
                variant="filled" 
                severity="success" 
                sx={{ 
                    zIndex: '2',
                    position: 'fixed', 
                    left: '35%',
                    bottom: '5rem', 
                    transform: 'translateX(-50%)',
                    width: '40rem' 
                }}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleClose}
                        sx={{ alignSelf: 'center', paddingBottom: '0.5rem' }} 
                    >
                        <CloseIcon sx={{ fontSize: '2rem' }}/>
                    </IconButton>
                }
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Box sx={{ width: '30rem' }}>
                        <AlertTitle>{message}</AlertTitle>
                        Signed In Successfully
                    </Box>
                    
                    <Typography sx={{ fontWeight: 'bold', fontSize: '1rem', color: '#fff' }}>
                        SUCCESS
                    </Typography>
                </Box>
            </Alert>
        </Zoom>
    );
};

export default LoginAlert;