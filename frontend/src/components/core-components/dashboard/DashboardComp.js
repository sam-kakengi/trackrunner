import React, { useState, useEffect } from 'react'
import {  Container, } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import DrawerTheme from '../../../theme/dashboard_themes/drawerTheme'
import { ThemeProvider } from '@mui/material/styles'
import Header from './Header'
import DashboardGrid from './Grid'
import RunningAPI from '../../../utilities/apiClient'
import { processData } from './chart_components/LineChart'

/**
 * DashboardComponent is a functional component that renders a dashboard with various cards and features.
 * 
 *
 * @returns {JSX.Element} The rendered DashboardComponent
 */

const DashboardComponent = ({setIsAuthenticated}) => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || { username: 'Guest' }

    const [drawerOpen, setDrawerOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width:600px)')

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open)
    }

    const [recentRuns, setRecentRuns] = useState([])
    const [awaitingRunData, setAwaitingRunData] = useState(true)
    const [error, setError] = useState(null)

    const fetchRecentRuns = async () => {
        setAwaitingRunData(true) // Set awaitingRunData to true before fetching
        const api = new RunningAPI()
        const allRuns = await api.getData('run')

        if (allRuns === null) {
            setError('Failed to load recent runs. Please try again later.')
        } else {
            const sortedRuns = allRuns.sort((a, b) => new Date(b.finished) - new Date(a.finished))
            const recentRuns = sortedRuns.slice(0, 5)
            setRecentRuns(recentRuns)
        }
        setAwaitingRunData(false)
    }

    const [chartData, setChartData] = useState({ datasets: [], allDates: [] })
    const [chartError, setChartError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchChartData = async () => {
        setLoading(true)
        const api = new RunningAPI()
        try {
          const response = await api.getData('run/chart')
          if (response) {
            const processedData = processData(response.data)
            setChartData(processedData)
          } else {
            setChartError('No data available')
          }
        } catch (err) {
          setChartError('Failed to fetch data')
        } finally {
          setLoading(false)
          console.log(chartData)
        }
      }
    
      useEffect(() => {
        fetchRecentRuns()
        fetchChartData()
      }, [])

    return (
        
        {/* Drawer Theme */},
        <ThemeProvider theme={DrawerTheme}>
            {/* Main Container */}
            <Container maxWidth={false} sx={{ height: '100vh', minHeight:'100vh', overflow:'auto', backgroundColor: '#263238', width: '100%' }}>

                {/* Header Component */}
                <Header isMobile={isMobile} userInfo={userInfo} toggleDrawer={toggleDrawer} drawerOpen={drawerOpen} reloadDashboard={fetchRecentRuns}
                reloadChart={fetchChartData}/>
                
                {/* Grid Component */}
                <DashboardGrid recentRuns={recentRuns} awaitingRunData={awaitingRunData} error={error}
                chartData={chartData}
                loading={loading}
                chartError={chartError}/>

            </Container>
    </ThemeProvider>

    )
}

export default DashboardComponent