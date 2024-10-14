import { Box, Typography, Skeleton, useMediaQuery } from '@mui/material'
import { ThemeProvider} from '@mui/material/styles'
import tileTheme from '../../../theme/dashboard_themes/tileTheme'
import { useState, useEffect } from 'react'
import RunningAPI from '../../../utilities/apiClient'
import { blueGrey } from '@mui/material/colors'
import EditRunModal from './editRunComponents/EditRunModal'

const getBestRun = async () => {
    const api = new RunningAPI()
    const data = await api.getData('run/best')
    return data
}

const PersonalBestTile = ({theme, gridBoxStyle, tileBaseStyle}) => {
    const [bestRun, setBestRun] = useState(null)
    const [loading, setLoading] = useState(true)
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    useEffect(() => {
        const fetchBestRun = async () => {
            const data = await getBestRun()
            setBestRun(data)
            setLoading(false)
        }
        fetchBestRun()
    }, [])

    const handleTileClick = () => {
        if (bestRun) {
            setIsEditModalOpen(true)
        }
    }

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false)
    }

    const handleRunUpdated = async () => {
        
        const updatedData = await getBestRun()
        setBestRun(updatedData)
    }

    return (
        <>
            <Box 
                sx={{...gridBoxStyle, cursor: bestRun ? 'pointer' : 'default'}} 
                onClick={handleTileClick}
            >
                <ThemeProvider theme={tileTheme}>
                    {loading ? (
                        <Skeleton variant="square" width='100%' height='100%'/>
                    ) : bestRun ? (
                        <>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'body1' : 'h6'}>Personal Best</Typography>
                        <Typography sx={tileBaseStyle} variant={isMobile ? 'h4' : 'h2'} color={blueGrey[50]}>{bestRun.duration}</Typography>
                        <Typography sx={{...tileBaseStyle, paddingBottom: '0'}}  variant={isMobile ? 'h5' : 'h4'}>{bestRun.date}</Typography>
                        <Typography sx={{...tileBaseStyle, padding: '0'}}  variant={isMobile ? 'body1' : 'h6'}>{bestRun.route}</Typography>
                        </>
                    ) : (
                        <>
                            <Typography sx={{tileBaseStyle, textAlign: 'center'}} variant='h4'>No runs available</Typography>
                        </>
                    )}
                </ThemeProvider>
            </Box>
            {bestRun && (
                <EditRunModal 
                    open={isEditModalOpen}
                    handleClose={handleCloseEditModal}
                    run={bestRun}
                    onRunUpdated={handleRunUpdated}
                />
            )}
        </>
    )
}

export default PersonalBestTile