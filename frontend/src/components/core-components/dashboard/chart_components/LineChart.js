import React, { useState, useEffect, useMemo } from 'react'
import { ResponsiveChartContainer, ChartsXAxis, ChartsYAxis, LinePlot, MarkPlot, ChartsTooltip, ChartsLegend } from '@mui/x-charts'
import { Box, Typography, CircularProgress, useTheme, useMediaQuery } from '@mui/material'
import { yellow, lightBlue, pink, purple, orange, lime } from '@mui/material/colors'
import RunningAPI from '../../../../utilities/apiClient'
import { formatDuration } from '../../../../utilities/timeUtil'

const colors = [yellow[400], lightBlue[400], pink[400], purple[400], orange[400], lime[400]]

const processData = (chartData) => {
    if (!chartData) return { datasets: [], allDates: [] }
    
    const allDates = [...new Set(Object.values(chartData).flatMap(route => route.map(run => run.date)))]
      .map(dateStr => new Date(dateStr.split('-').reverse().join('-')))
      .sort((a, b) => a - b)
      .map(date => date.toISOString().split('T')[0].split('-').reverse().join('-'))
    
    const datasets = Object.entries(chartData).map(([routeName, runs]) => {
      return {
        label: routeName,
        data: allDates.map(date => {
          const run = runs.find(r => r.date === date)
          return run ? run.duration / 60 : null
        })
      }
    })
  
    return { datasets, allDates }
  }

const MultiSeriesLineChart = () => {
  const [chartData, setChartData] = useState({ datasets: [], allDates: [] })
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
          console.log(response, processedData)
          setChartData(processedData)
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

  if (loading) return <CircularProgress />
  if (error) return <Typography color="error">{error}</Typography>

  const getChartConfig = () => {
    if (isMobile) {
      return { height: 250, fontSize: '0.6rem', markerSize: 8, direction: 'column' }
    }
    if (isTablet) {
      return { height: 250, fontSize: '0.75rem', markerSize: 10, direction: 'column' }
    }
    if (isLaptop) {
      return { height: 350, fontSize: '0.875rem', markerSize: 14, direction: 'row' }
    }
    return { height: 600, fontSize: '1rem', markerSize: 20, direction: 'column'}
  }

  console.log(chartData)
  
  const chartConfig = getChartConfig()

  return (
    <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '1000px', height: '100%', maxHeight: '600px' }}>
        {chartData.datasets.length > 0 ? (
          <ResponsiveChartContainer
            series={chartData.datasets.map((dataset, index) => ({
              data: dataset.data,
              label: dataset.label,
              type: 'line',
              color: colors[index % colors.length],
              valueFormatter: (value) => value !== null ? `${value.toFixed(2)} min` : 'N/A',
            }))}
            xAxis={[
              {
                data: chartData.allDates,
                scaleType: 'band',
                domain: [0, 'auto'],
                valueFormatter: (value) => new Date(value.split('-').reverse().join('-')).toLocaleDateString(),
                id: 'x-axis-id',
              },
            ]}
            yAxis={[
              {
                scaleType: 'linear',
                valueFormatter: (value) => `${value.toFixed(0)} min`,
                id: 'y-axis-id',
              }
            ]}
            height={chartConfig.height}
            margin={{ top: 15, right: 45, bottom: 20, left: 70 }}
          >
            <ChartsLegend 
              position={{ vertical: 'top', horizontal: 'right' }}
              itemGap={5}
              direction={chartConfig.direction}
              slotProps={{
                legend: {
                  labelStyle: {
                    fontSize: chartConfig.fontSize,
                    fill: 'black',
                  },
                  itemMarkWidth: chartConfig.markerSize,
                  itemMarkHeight: chartConfig.markerSize,
                  
                },
              }}
            />
            <LinePlot />
            <ChartsXAxis position="bottom" axisId="x-axis-id" />
            <ChartsYAxis position="left" axisId="y-axis-id" />
            <MarkPlot />
            <ChartsTooltip />
          </ResponsiveChartContainer>
        ) : (
            <Typography 
            variant="h5" 
            color="text.secondary"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: {
                xs: '1.2rem', 
                sm: '1.5rem',  
                md: '1.8rem'   
              }
            }}
          >
            No data available
          </Typography>
        )}
      </div>
    </Box>
  )
}

export default MultiSeriesLineChart