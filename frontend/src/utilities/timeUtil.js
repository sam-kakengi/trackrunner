/**
 * Formats a duration in seconds to a string in the format HH:MM:SS
 * @param {number} duration - The duration in seconds
 * @returns {string} The formatted duration string
 */
export const formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export const formatDurationSecondsMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
}


export const formatMinutesToMMSS = (minutes) => {
    const totalSeconds = Math.floor(minutes * 60)
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }
  

const convertRunTimeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number)
    return (hours * 3600) + (minutes * 60) + seconds
  }

export default convertRunTimeToSeconds
