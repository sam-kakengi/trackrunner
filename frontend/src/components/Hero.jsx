import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Runner from '../assets/runner.mp4'
import Box from '@mui/material/Box';

export default function Hero() {
    return (
        
            <Grid container spacing={2} sx={{ 
                mx: 'auto', 
                padding: '2rem',
                maxWidth: '100%', 
                boxSizing: 'border-box',
                margin: 0, 
            }}> {/* Add spacing between items */}
                {/* Left Side: Text Section */}
                <Grid item xs={12} md={6} lg={6}>
                    <Typography 
                        variant="h1" 
                        sx={{ 
                            fontWeight: "500", 
                            letterSpacing: "0.4rem",
                            textTransform: "uppercase", 
                            fontSize: "3rem"
                        }}
                    >
                        RunTracker
                    </Typography>

                    <Divider sx={{ marginBottom: 2 }} color="white" />

                    <Typography variant="body1" component="p" sx={{ fontSize: { xs: "1.25rem", md: "1.25rem", lg: "2rem"} }}>
                        <span style={{ fontWeight: "500", color: "white" }}>RunTracker</span> is your ultimate running companion. Keep track of your runs, monitor your progress, and reach your fitness goals with ease.
                    </Typography>
                </Grid>

                {/* Right Side: Video Section */}
                <Grid item xs={12} md={6} lg={6} sx={{ my: 1 }}>
                    <div style={{ 
                        position: 'relative', 
                        paddingBottom: '56.25%', /* 16:9 aspect ratio */
                        height: 0,
                        overflow: 'hidden',
                        borderRadius: '0.6rem'
                    }}>
                        <video 
                            src={Runner}
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '0.6rem'
                            }}
                            alt="Man running on the beach"
                        />
                    </div>
                </Grid>
            </Grid>
        
    )
}