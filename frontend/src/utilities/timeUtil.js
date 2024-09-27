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