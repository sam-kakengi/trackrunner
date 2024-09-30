import { Box, Typography, Skeleton, useMediaQuery } from '@mui/material';
import { ThemeProvider} from '@mui/material/styles';
import tileTheme from '../../../theme/dashboard_themes/tileTheme';
import { useState, useEffect } from 'react';
import RunningAPI from '../../../utilities/apiClient';
import { blueGrey } from '@mui/material/colors';

const getBestRun = async () => {
    const api = new RunningAPI();
    const data = await api.getData('run/best');
    return data;
};

const PersonalBestTile = ({theme, gridBoxStyle, tileBaseStyle}) => {
    const [recentRun, setRecentRun] = useState(null);
    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    

    useEffect(() => {
        const fetchBestRun = async () => {
            const data = await getBestRun();
            setRecentRun(data);
            setLoading(false);
        };
        fetchBestRun();
    }, []);

    return (
        <Box sx={gridBoxStyle}>
            <ThemeProvider theme={tileTheme}>
                {loading ? (
                    <Skeleton variant="square" width='100%' height='100%'/>
                ) : recentRun ? (
                    <>
                    <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>Personal Best</Typography>
                    <Typography sx={tileBaseStyle} variant={isMobile ? 'h4' : 'h2'} color={blueGrey[50]}>{recentRun.duration}</Typography>
                    <Typography sx={tileBaseStyle} variant={isMobile ? 'h5' : 'h4'}>{recentRun.date}</Typography>
                    <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>{recentRun.route}</Typography>
                    </>
                ) : (
                    <>
                        <Typography sx={{tileBaseStyle, textAlign: 'center'}} variant='h4'>No runs available</Typography>
                    </>
                )}
            </ThemeProvider>
        </Box>
    )
}

export default PersonalBestTile;