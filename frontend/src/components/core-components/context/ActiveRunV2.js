import React, { createContext, useState, useContext, useEffect } from 'react'
import RunningAPI from '../../../utilities/apiClient'

const ActiveRunContext = createContext()

export const ActiveRunProvider = ({ children }) => {
    const api = new RunningAPI()
    const [activeRun, setActiveRun] = useState(null)
    const [pausedRun, setPausedRun] = useState({
        isPaused: false,
        pausedDuration: 0,
    })
    const [endRunModalOpen, setEndRunModalOpen] = useState(false)
    const [preEndRunModalOpen, setPreEndRunModalOpen] = useState(false)

    const getActiveRunData = async () => {
        return await api.getData('run/active')
    }

    useEffect(() => {
        const fetchActiveRun = async () => {
            const running = await getActiveRunData()
            if (running) {
                const startTime = localStorage.getItem('runStartTime')
                setActiveRun({
                    isRunning: true,
                    routeID: running.route.id,
                    routeName: running.route.name,
                    notes: running.notes,
                    startTime: startTime ? new Date(parseInt(startTime)) : new Date(),
                })
                if (!startTime) {
                    localStorage.setItem('runStartTime', new Date().getTime().toString())
                }
            } else {
                setActiveRun({
                    isRunning: false,
                    route: '',
                    notes: '',
                })
                localStorage.removeItem('runStartTime')
            }
        }
        fetchActiveRun()
    }, [])

    const startRun = async (route, notes) => {
        try {
            const response = await api.postData('run/active', { route, notes })
            console.log('API response:', response)
            
            if (response && response.route) {
                const running = await api.getData('run/active')
                const startTime = new Date()
                localStorage.setItem('runStartTime', startTime.getTime().toString())
                setActiveRun({
                    isRunning: true,
                    routeID: running.route.id,
                    notes: running.notes,
                    routeName: running.route.name,
                    startTime: startTime,
                })
    
                
                try {
                    const routeDetails = await api.getData(`run/routes/${response.route}`)
                    // Update the active run with the route name
                    setActiveRun(prevRun => ({
                        ...prevRun,
                        routeName: routeDetails.name
                    }))
                } catch (routeError) {
                    console.error('Error fetching route details:', routeError)
                    
                    setActiveRun(prevRun => ({
                        ...prevRun,
                        routeName: 'Unknown Route'
                    }))
                }
            } else {
                console.error('Error starting the run: Invalid response', response)
            }
        } catch (error) {
            console.error('Error starting the run')
        }
    }

    const resumeRun = async () => {
        try {
            return await api.patchData('run/active', { paused: pausedRun.pausedDuration })
        } catch (error) {
            console.error('Error resuming the run')
        }
    }

    const endRunPatch = async () => {
        try {
            return await api.patchData('run/active', {})
        } catch (error) {
            console.error('Error ending the run')
        }
    }

    const endRun = async (runId, routeID, notes) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`http://127.0.0.1:8000/api/run/${runId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`
                },
                body: JSON.stringify({
                    route: routeID,
                    notes: notes
                })
            })
      
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
      
            const data = await response.json()
            console.log('Run ended successfully:', data)
      
            setActiveRun({
                isRunning: false
            })
            setEndRunModalOpen(false)
            setPausedRun({ isPaused: false, pausedDuration: 0 })
    
            
            localStorage.removeItem('runStartTime')
            localStorage.removeItem('pausedDuration')
            localStorage.removeItem('pausedRun')
    
            return data
        } catch (error) {
            console.error('Error ending the run')
            throw error
        }
    }

    return (
        <ActiveRunContext.Provider value={{ activeRun, startRun, endRun, pausedRun, setPausedRun, resumeRun,
            endRunPatch, endRunModalOpen, setEndRunModalOpen, preEndRunModalOpen, setPreEndRunModalOpen
         }}>
            {children}
        </ActiveRunContext.Provider>
    )
}

export const useActiveRun = () => useContext(ActiveRunContext)