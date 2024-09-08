import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Handles the logout functionality.
 * 
 * This function is responsible for removing the 'token' and 'userInfo' from the local storage,
 * setting the 'logoutAlert' to 'true' in the local storage, and navigating the user to the home page ('/').
 * 
 * @returns {null} Returns null.
 */

const HandleLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.setItem('logoutAlert', 'true');
        navigate('/');
    }, [navigate]);

    return null;
};

export default HandleLogout;