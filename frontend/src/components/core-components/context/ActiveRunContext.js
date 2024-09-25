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

      console.log(response.data)

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
        return { ...prev, duration: prev.duration + 1 }
      })
    }, 1000)
    setIntervalId(id)
  }

  const pauseRun = () => {
    setActiveRun(prev => ({
      ...prev,
      isPaused: true,
      pauseStartTime: Date.now()
    }))
  }

  const resumeRun = () => {
    // This method should be used to upate the total amount of time spent paused with a PATCH /run/active
    // You only need to send the amount of time spent paused since the last pause.
    setActiveRun(prev => {
      const additionalPausedDuration = prev.pauseStartTime ? Math.floor((Date.now() - prev.pauseStartTime) / 1000) : 0
      return {
        ...prev,
        isPaused: false,
        pausedDuration: prev.pausedDuration + additionalPausedDuration,
        pauseStartTime: null
      }
    })
  }

  const endRun = async (notes) => {
    const token = localStorage.getItem('token')
    const payload = {
      route: activeRun.routeId,
      notes,
      paused: activeRun.pausedDuration,
      duration: activeRun.duration,
    }


    if (activeRun.isPaused) {
      payload.paused += Math.floor((Date.now() - activeRun.pauseStartTime) / 1000)
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