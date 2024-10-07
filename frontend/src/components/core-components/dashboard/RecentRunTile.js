import { Box, Typography, Skeleton, useMediaQuery } from '@mui/material'
import { ThemeProvider} from '@mui/material/styles'
import tileTheme from '../../../theme/dashboard_themes/tileTheme'
import { useState, useEffect } from 'react'
import RunningAPI from '../../../utilities/apiClient'
import { blueGrey } from '@mui/material/colors'
import EditRunModal from './editRunComponents/EditRunModal'

const getRecentRun = async () => {
    const api = new RunningAPI()
    const data = await api.getData('run/recent')
    return data
}

const RecentRunTile = ({theme, gridBoxStyle, tileBaseStyle}) => {
    const [recentRun, setRecentRun] = useState(null)
    const [loading, setLoading] = useState(true)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    useEffect(() => {
        const fetchRecentRun = async () => {
            const data = await getRecentRun()
            setRecentRun(data)
            setLoading(false)
        }
        fetchRecentRun()
    }, [])

    const handleTileClick = () => {
        if (recentRun) {
            setIsEditModalOpen(true)
        }
    }

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false)
    }

    const handleRunUpdated = async () => {
        
        const updatedData = await getRecentRun()
        setRecentRun(updatedData)
    }

    return (
        <>
            <Box 
                sx={{...gridBoxStyle, cursor: recentRun ? 'pointer' : 'default'}} 
                onClick={handleTileClick}
            >
                <ThemeProvider theme={tileTheme}>
                    {loading ? (
                        <Skeleton variant="square" width='100%' height='100%'/>
                    ) : recentRun ? (
                        <>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>Previous Run</Typography>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'h4' : 'h2'} color={blueGrey[50]}>{recentRun.date}</Typography>
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
            {recentRun && (
                <EditRunModal 
                    open={isEditModalOpen}
                    handleClose={handleCloseEditModal}
                    run={recentRun}
                    onRunUpdated={handleRunUpdated}
                />
            )}
        </>
    )
}

export default RecentRunTile