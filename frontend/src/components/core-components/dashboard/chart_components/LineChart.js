import React, { useState, useEffect } from 'react'
import { LineChart } from '@mui/x-charts'
import { Box, Typography } from '@mui/material'
import { yellow, lightBlue, pink, purple, orange, lime } from '@mui/material/colors'
import RunningAPI from '../../../../utilities/apiClient'
import { formatDuration } from '../../../../utilities/timeUtil'

const colors = [yellow[400], lightBlue[400], pink[400], purple[400], orange[400], lime[400]]

const processData = (data) => {
    const dates = [...new Set(Object.values(data).flat().map(item => item.date))]
    return dates.map(date => {
        const entry = { date: new Date(date) }
        Object.keys(data).forEach(route => {
            entry[route] = data[route].find(item => item.date === date)?.duration || null
        })
        return entry
    })
}

const MultiSeriesLineChart = () => {
    const [chartData, setChartData] = useState([])
    const [routes, setRoutes] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const api = new RunningAPI()
            const data = await api.getData('run/chart')
            if (data) {
                setChartData(processData(data))
                setRoutes(Object.keys(data))
            }
        }
        fetchData()
    }, [])

    return (
        <Box sx={{ padding: '2rem', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <Typography variant="h6" gutterBottom>
                Running Performance Chart
            </Typography>
            {chartData.length > 0 && (
                <LineChart
                    width={600}
                    height={400}
                    series={routes.map((route, index) => ({
                        dataKey: route,
                        label: route,
                        color: colors[index % colors.length],
                        valueFormatter: (value) => formatDuration(value),
                    }))}
                    xAxis={[{ 
                        dataKey: 'date',
                        scaleType: 'time',
                        valueFormatter: (value) => value.toLocaleDateString(),
                    }]}
                    yAxis={[{ 
                        valueFormatter: (value) => formatDuration(value),
                    }]}
                    slotProps={{
                        legend: {
                            hidden: false,
                        },
                    }}
                    data={chartData}
                />
            )}
        </Box>
    )
}

export default MultiSeriesLineChart