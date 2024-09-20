import React, { createContext, useState, useContext, useEffect } from 'react'

const ActiveRunContext = createContext()


export const ActiveRunProvider = ({ children }) => {
  const [activeRun, setActiveRun] = useState({
    isRunning: false,
    isPaused: false,
    duration: 0,
    pausedDuration: 0,
    routeId: '',
    routeName: '',
    notes: '',
    startTime: null,
    pauseStartTime: null
  })

  const [intervalId, setIntervalId] = useState(null)

  const startRun = async (routeId, routeName, notes) => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://127.0.0.1:8000/api/run/active', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({ route: routeId, notes })
      })

      if (response.ok) {
        setActiveRun({
          isRunning: true,
          isPaused: false,
          duration: 0,
          pausedDuration: 0,
          routeId,
          routeName,
          notes,
          startTime: Date.now(),
          pauseStartTime: null
        })
        startDurationCounter()
      } else {
        console.error('Error starting the run:', await response.json())
      }
    } catch (error) {
      console.error('Error starting the run:', error)
    }
  }

  const startDurationCounter = () => {
    const id = setInterval(() => {
      setActiveRun(prev => {
        if (prev.isPaused) return prev
        const now = Date.now()
        const elapsedTime = Math.floor((now - prev.startTime) / 1000)
        return { ...prev, duration: elapsedTime - prev.pausedDuration }
      })
    }, 1000)
    setIntervalId(id)
  }

  const startPauseCounter = () => {
    const id = setInterval(() => {
      setActiveRun(prev => {
        if (!prev.isPaused) return prev
        const pausedTime = Math.floor((Date.now() - prev.pauseStartTime) / 1000)
        return { ...prev, pausedDuration: pausedTime }
      })
    }, 1000)
    setIntervalId(id)
  }

  const endRun = async (notes) => {
    const token = localStorage.getItem('token')
    const payload = {
      finished: true,
      route: activeRun.routeId,
      notes,
      paused: activeRun.pausedDuration
    }

    console.log("Payload Before Sending:", payload)
    try {
      const response = await fetch('http://127.0.0.1:8000/api/run/active', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        console.log('Run ended successfully')
        clearInterval(intervalId)
        setActiveRun({
          isRunning: false,
          isPaused: false,
          duration: 0,
          pausedDuration: 0,
          routeId: '',
          routeName: '',
          notes: '',
          startTime: null,
          pauseStartTime: null
        })
      } else {
        console.error('Error ending the run:', await response.json())
      }
    } catch (error) {
      console.error('Error ending the run:', error)
    }
  }

  const pauseRun = () => {
    clearInterval(intervalId) 
    setActiveRun(prev => ({
      ...prev,
      isPaused: true,
      pauseStartTime: Date.now() 
    }))
    startPauseCounter() 
  }

  const resumeRun = () => {
    clearInterval(intervalId) 
    setActiveRun(prev => {
      const additionalPausedDuration = Math.floor((Date.now() - prev.pauseStartTime) / 1000)
      return {
        ...prev,
        isPaused: false,
        pausedDuration: prev.pausedDuration + additionalPausedDuration,
        pauseStartTime: null
      }
    })
    startDurationCounter() 
  }

  useEffect(() => {
    return () => clearInterval(intervalId) 
  }, [intervalId])

  return (
    <ActiveRunContext.Provider value={{ activeRun, startRun, endRun, pauseRun, resumeRun }}>
      {children}
    </ActiveRunContext.Provider>
  )
}

export const useActiveRun = () => useContext(ActiveRunContext)