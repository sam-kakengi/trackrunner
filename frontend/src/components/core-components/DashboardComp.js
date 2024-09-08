import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardHeader, Avatar, IconButton, Alert, Box, AlertTitle } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import LoginAlert from '../auth-components/LoginAlertComp';
import HandleLogout from '../auth-components/Logout';

/**
 * DashboardComponent is a functional component that renders a dashboard with various cards and features.
 * 
 *
 * @returns {JSX.Element} The rendered DashboardComponent
 */

const DashboardComponent = ({setIsAuthenticated}) => {
    const [logout, setLogout] = React.useState(false);

    const handleLogoutClick = () => {
        setLogout(true);
    };

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    return (
        <Container
                    maxWidth={false}
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        height: '100vh',          
                        backgroundColor: '#55505C',
                        maxWidth: '100%',
                        padding: '0',
                        margin: '0',               
                    }}
        >
            <Grid container spacing={3}>

                <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <AccountCircleIcon />
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="logout" onClick={handleLogoutClick}>
                                        <ExitToAppIcon />
                                    </IconButton>
                                }
                                title={`Welcome ${userInfo.username ? userInfo.username : userInfo.email}`}
                                subheader="Your Dashboard"
                            />
                            {logout && <HandleLogout setIsAuthenticated={setIsAuthenticated}/>}  {/* This will log the user out */}
                            <CardContent>
                            </CardContent>
                        </Card>
                    </Grid>

                <Grid item xs={12}>
                    <Card sx={{ backgroundColor: '#39375B', color: '#FFFFFF' }}>
                        <CardHeader
                            avatar={<DashboardIcon />}
                            title={
                                <Typography variant="h5" component="div">
                                    Dashboard Overview
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="inherit">
                                Welcome to your dashboard! Here you can manage your profile, settings, and view analytics.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader
                            avatar={<AccountCircleIcon />}
                            title={
                                <Typography variant="h6" component="div">
                                    Profile
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                View and edit your profile information here.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader
                            avatar={<SettingsIcon />}
                            title={
                                <Typography variant="h6" component="div">
                                    Settings
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Manage your account settings and preferences.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <LoginAlert />

                <Grid item xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader
                            avatar={<AssessmentIcon />}
                            title={
                                <Typography variant="h6" component="div">
                                    Analytics
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                View detailed analytics of your activities.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DashboardComponent;