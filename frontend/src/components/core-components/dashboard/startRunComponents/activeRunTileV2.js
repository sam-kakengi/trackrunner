import { Box, Typography, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import tileTheme from '../../../../theme/dashboard_themes/tileTheme';
import { useActiveRun } from '../../context/ActiveRunV2'
import { blueGrey } from '@mui/material/colors';

const ActiveRunTile = ({ theme, gridBoxStyle, tileBaseStyle }) => {
    const { activeRun } = useActiveRun(); // Get activeRun from context
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));  

    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 3600)
        const minutes = Math.floor((duration % 3600) / 60)
        const seconds = duration % 60
      
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      }
 
      

    return (
        <Box sx={gridBoxStyle}>
            <ThemeProvider theme={tileTheme}>
                {activeRun.isRunning ? ( // Check if the run is active
                    <>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>Active Run</Typography>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'h5' : 'h4'}>{formatDuration(activeRun.duration) || 'No duration'}</Typography>
                        {activeRun.isPaused ? ( 
                            <Typography sx={tileBaseStyle} variant={isMobile ? 'h5' : 'h4'} color={blueGrey[500]}>
                                Paused
                            </Typography>
                        ) : (
                            <Typography sx={tileBaseStyle} variant={isMobile ? 'h5' : 'h4'}>
                                In Progress
                            </Typography>
                        )}
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>{activeRun.routeName || 'No route'}</Typography>
                    </>
                ) : (
                    <Typography sx={{ ...tileBaseStyle, textAlign: 'center' }} variant='h4'>No active run</Typography>
                )}
            </ThemeProvider>
        </Box>
    )
}

export default ActiveRunTile

