import React, { useState, useEffect } from 'react'
import { LineChart } from '@mui/x-charts'
import { Box, Typography, CircularProgress, useTheme, useMediaQuery } from '@mui/material'
import { yellow, lightBlue, pink, purple, orange, lime } from '@mui/material/colors'
import RunningAPI from '../../../../utilities/apiClient'
import { formatDuration } from '../../../../utilities/timeUtil'

const colors = [yellow[400], lightBlue[400], pink[400], purple[400], orange[400], lime[400]]

const processData = (data) => {
    const allDates = [...new Set(Object.values(data).flat().map(item => item.date))].sort()
    return allDates.map(date => {
        const entry = { date: new Date(date.split('-').reverse().join('-')) }
        Object.keys(data).forEach(route => {
            const run = data[route].find(item => item.date === date)
            entry[route] = run ? run.duration : null
        })
        return entry
    })
}

const MultiSeriesLineChart = () => {
    const [chartData, setChartData] = useState([])
    const [routes, setRoutes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isLaptop = useMediaQuery(theme.breakpoints.between('md', 'lg'))
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const api = new RunningAPI()
                const response = await api.getData('run/chart')
                if (response && response.chart_data) {
                    const processedData = processData(response.chart_data)
                    setChartData(processedData);
                    setRoutes(Object.keys(response.chart_data))
                } else {
                    setError('No data available')
                }
            } catch (err) {
                setError('Failed to fetch data')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    const getChartDimensions = () => {
        if (isMobile) {
            return { width: 300, height: 250, fontSize: 10, margin: { top: 40, right: 20, bottom: 30, left: 40 } }
        } else if (isTablet) {
            return { width: 550, height: 250, fontSize: 12, margin: { top: 50, right: 20, bottom: 30, left: 60 } }
        } else if (isLaptop) {
            return { width: 700, height: 350, fontSize: 14, margin: { top: 70, right: 20, bottom: 30, left: 60 } }
        } else {
            return { width: 700, height: 600, fontSize: 16, margin: { top: 10, right: 45, bottom: 30, left: 70 } }
        }
    }

    const { width, height, fontSize, margin } = getChartDimensions()

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Box sx={{ 
            padding: isMobile ? '0.5rem' : isTablet ? '1rem' : '2rem',
            backgroundColor: 'inherit', 
            borderRadius: '8px',
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        }}>
            {chartData.length > 0 ? (
                <LineChart
                    xAxis={[{
                        dataKey: 'date',
                        scaleType: 'time',
                        valueFormatter: (value) => value.toLocaleDateString(),
                        tickLabelStyle: { fill: '#000000', fontSize },
                    }]}
                    yAxis={[{
                        tickLabelStyle: { fill: '#000000', fontSize },
                    }]}
                    series={routes.map((route, index) => ({
                        dataKey: route,
                        label: route,
                        color: colors[index % colors.length],
                        valueFormatter: (value) => formatDuration(value),
                        curve: "linear",
                    }))}
                    dataset={chartData}
                    width={width}
                    height={height}
                    margin={margin}
                    sx={{
                        '.MuiLineElement-root': {
                            strokeWidth: isMobile ? 1 : isTablet ? 1.5 : 2,
                        },
                        '.MuiMarkElement-root': {
                            stroke: '#fff',
                            scale: isMobile ? '0.4' : isTablet ? '0.5' : '0.6',
                            fill: '#fff',
                        },
                        '.MuiChartsLegend-root': {
                            color: '#fff',
                            fontSize: fontSize,
                            width: '100%',
                        },
                        '& .MuiChartsLegend-label': {
                            fill: '#ffffff',
                            fontSize: fontSize,
                        },
                    }}
                    slotProps={{
                        legend: {
                            hidden: false,
                            direction: 'row',
                            itemMarkWidth: 15,
                            itemMarkHeight: 15,
                            markGap: 5,
                            itemGap: 20,
                            labelStyle: {
                                fill: '#ffffff',
                                fontSize: fontSize,
                            },
                            sx: {
                                display: 'flex',
                                flexWrap: 'wrap', // Allow wrapping if the legend items overflow horizontally
                                justifyContent: 'center', // Center the legend items
                                '& .MuiChartsLegend-mark': {
                                marginRight: '8px',
                                },
                                '& .MuiChartsLegend-label': {
                                marginRight: '16px',
                                },
                                '& .MuiChartsLegend-mark': {
                                    marginRight: '8px',
                                },
                                
                            }
                        },
                    }}
                />
            ) : (
                <Typography color="white">No data available for the chart</Typography>
            )}
        </Box>
    )
}

export default MultiSeriesLineChart