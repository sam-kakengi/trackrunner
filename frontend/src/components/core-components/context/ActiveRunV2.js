import React, { createContext, useState, useContext, useEffect } from 'react'
import RunningAPI from '../../../utilities/apiClient';


const ActiveRunContext = createContext()

export const ActiveRunProvider = ({ children }) => {
    const api = new RunningAPI();
    const [activeRun, setActiveRun] = useState(null);
    const getActiveRunData = async () => {
        return await api.getData('run/active');
    };
    const running = getActiveRunData();
    if (running) {
        setActiveRun({
            isRunning: true,
            routeId: running.routeId,
            notes: running.notes,
        });
    }
    else {
        setActiveRun({
            isRunning: false,
            routeId: '',
            notes: '',
        });
    }
    
    
    const startRun = async (routeId, notes) => {
        try {
            const response = await api.postData('run/active', { routeId, notes });
            if (response) {
                setActiveRun({
                    isRunning: true,
                    routeId,
                    notes,
                });
            } else {
                console.error('Error starting the run');
            }
        } catch (error) {
            console.error('Error starting the run');
        }
    };

    const [pausedRun, setPausedRun] = useState({
        isPaused: false,
        pausedDuration: 0,
      });

    const resumeRun = async () => {
        try {

            return await api.patchData('run/active', { pausedDuration: pausedRun.pausedDuration });
        } catch (error) {
            console.error('Error resuming the run');
        }
    }

    const endRun = async () => {
        try {
            const response = await api.patchData('run/active', { });
            if (response) {
                setActiveRun({
                    isRunning: false
                });
            } else {
                console.error('Error resuming the run');
            }
        } catch (error) {
            console.error('Error resuming the run');
        }
    }
    return (
        <ActiveRunContext.Provider value={{ activeRun, startRun, endRun, pausedRun , resumeRun }}>
          {children}
        </ActiveRunContext.Provider>
      )

}

export const useActiveRun = () => useContext(ActiveRunContext)