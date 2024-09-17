import { Box, Typography, Skeleton, useMediaQuery } from '@mui/material';
import { ThemeProvider} from '@mui/material/styles';
import tileTheme from '../../../theme/dashboard_themes/tileTheme';
import { useState, useEffect } from 'react';
import RunningAPI from '../../../utilities/apiClient';

const getRecentRun = async () => {
    const api = new RunningAPI();
    const data = await api.getData('run/recent');
    return data;
};

const RecentRunTile = ({theme, gridBoxStyle, tileBaseStyle}) => {
    const [recentRun, setRecentRun] = useState(null);
    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    

    useEffect(() => {
        const fetchRecentRun = async () => {
            const data = await getRecentRun();
            setRecentRun(data);
            setLoading(false);
        };
        fetchRecentRun();
    }, []);

    return (
        <Box sx={gridBoxStyle}>
            <ThemeProvider theme={tileTheme}>
                {loading ? (
                    <Skeleton variant="square" width='100%' height='100%'/>
                ) : recentRun ? (
                    <>
                    <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>Previous Run</Typography>
                    <Typography sx={tileBaseStyle} variant={isMobile ? 'h3' : 'h2'}>{recentRun.date}</Typography>
                    <Typography sx={tileBaseStyle} variant={isMobile ? 'h5' : 'h4'}>{recentRun.duration}</Typography>
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

export default RecentRunTile;