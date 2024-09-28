import React from 'react'
import { Drawer, Box, List, ListItem, ListItemText, ListItemIcon, Divider, Typography, Button, ListItemButton } from '@mui/material'
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined' 
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
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
                    color: 'white',
                    paddingTop: '2rem',
                }}>
                
                {/* Greeting Text */}
                {/* <Box sx={{ padding: '1rem', backgroundColor: '#37474F' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'normal' }}>Hi,</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'normal'}}>
                        {userInfo.username}
                    </Typography>
                </Box> */}
                {/* -- Commented out as it is not needed temporarily */}

                {/* List of Buttons */}
                <List>

                    {/* Run History */}
                    <ListItem onClick={() => console.log('Run History clicked')}>
                        <ListItemIcon>
                            <DirectionsWalkOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Run History" />
                    </ListItem>

                    {/* Routes */}
                    <ListItem onClick={() => console.log('Routes clicked')}>
                        <ListItemIcon>
                            <LocationOnOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Routes" />
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

                    <Divider 
                        sx={{ 
                        borderColor: 'white',  
                        width: '85%',           
                        margin: '1rem auto',    
                        }} 
                    />
                        
                        {/* Logout */}
                    <ListItem onClick={() => console.log('Logout clicked')}>
                        <ListItemIcon>
                            <ExitToAppOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out"/>
                    </ListItem>

                </List>
            </Box>
        </Drawer>
    </ThemeProvider>
    )
}

export default UserDrawer