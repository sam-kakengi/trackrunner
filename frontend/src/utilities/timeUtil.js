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

export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    
    const nth = (d) => {
        if (d > 3 && d < 21) return 'th'
        switch (d % 10) {
            case 1:  return "st"
            case 2:  return "nd"
            case 3:  return "rd"
            default: return "th"
        }
    }
    
    return `${day}${nth(day)} of ${month}`
}