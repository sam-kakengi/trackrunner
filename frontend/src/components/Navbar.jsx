import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import PersonIcon from '@mui/icons-material/Person';


export default function Navbar() {

    const pages = ["Home", "Runs", "Guides"]
    const settings = ["Profile", "Settings", "Logout"]

    const [AnchorElNav, setAnchorElNav] = React.useState(null)
    const [AnchorElUser, setAnchorElUser] = React.useState(null)

    const HandleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const HandleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const HandleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const HandleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <Box sx={{ flexGrow: 1, height: "5rem" }}>
            <AppBar position="static" sx={{ height: "100%", backgroundColor: "#B0C6CE"}}>
                <Toolbar sx={{ padding: "0", height:"100%", alignItems: "center" }}>
                    <DirectionsRunIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" noWrap sx={{ display: {xs: 'none', md: 'flex'}, mr: 10, letterSpacing: "0.2rem" }}>
                        RUNTRACKER
                    </Typography>

                    {/* The box below is responsive for mobile screens */}
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        {/* Menu Icon for small screens */}
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={HandleOpenNavMenu}
                            color="inherit"
                            >
                            <MenuIcon />
                            </IconButton>

                            <Menu
                            id="menu-appbar"
                            anchorEl={AnchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(AnchorElNav)}
                            onClose={HandleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={HandleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                            </Menu>
                        </Box>

                        {/* Logo Icon */}
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        {/* Navigation Buttons for larger screens */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={HandleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', mx: 1 }}
                            >
                                {page}
                            </Button>
                            ))}
                        </Box>

                        {/* Avatar Icon for all screens */}
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                            <IconButton onClick={HandleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar>
                                <PersonIcon />
                                </Avatar>
                            </IconButton>
                            </Tooltip>
                            <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={AnchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(AnchorElUser)}
                            onClose={HandleCloseUserMenu}
                            >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={HandleCloseUserMenu}>
                                <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                            </Menu>
                        </Box>
                        </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}