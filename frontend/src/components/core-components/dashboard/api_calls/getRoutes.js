import axios from 'axios'

/**
 * Fetches routes from the API.
 * @returns {Promise<Array>} The array of route objects.
 */
const fetchRoutes = async () => {
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      console.error('No token found')
      return []
    }

    const response = await axios.get('http://localhost:8000/api/run/routes/', {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })

    const responseRoutesArray = Object.values(response.data) // Convert the object to an array
    return responseRoutesArray

  } catch (error) {
    console.error('Error fetching routes:', error)
    return []
  }
}

export default fetchRoutes
