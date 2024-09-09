import React from 'react'
import { Drawer, Box, List, ListItem, ListItemText, ListItemIcon, Divider, Typography } from '@mui/material'
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined' 
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import drawerTheme from '../../../theme/dashboard_themes/drawerTheme'
import { ThemeProvider } from '@mui/material/styles'

const UserDrawer = ({ drawerOpen, toggleDrawer, userInfo }) => {
    return (
    <ThemeProvider theme={drawerTheme}>
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box role="presentation" onClick={toggleDrawer(false)} sx={{ 
                    width: 250, 
                    backgroundColor: '#37474F', 
                    height: '100%',  
                    color: 'white'  
                }}>
                
                {/* Greeting Text */}
                <Box sx={{ padding: '1rem', backgroundColor: '#37474F' }}>
                    <Typography variant="h7" sx={{ fontWeight: 'normal' }}>
                        Hi, {userInfo.username}
                    </Typography>
                </Box>

                {/* List of Buttons */}
                <List>

                    {/* Run History */}
                    <ListItem onClick={() => console.log('Run History clicked')}>
                        <ListItemIcon>
                            <DirectionsWalkOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Run History" />
                    </ListItem>


                    {/* Settings */}
                    <ListItem onClick={() => console.log('Settings clicked')}>
                        <ListItemIcon>
                            <SettingsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>


                    {/* Manage Account */}
                    <ListItem onClick={() => console.log('Manage Account clicked')}>
                        <ListItemIcon>
                            <AccountCircleOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Account" />
                    </ListItem>


                    {/* Routes */}
                    <ListItem onClick={() => console.log('Routes clicked')}>
                        <ListItemIcon>
                            <LocationOnOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Routes" />
                    </ListItem>

                    <Divider 
                        sx={{ 
                        borderColor: 'white',  
                        width: '85%',           
                        margin: '1rem auto',    
                        }} 
                    />

                </List>
            </Box>
        </Drawer>
    </ThemeProvider>
    )
}

export default UserDrawer