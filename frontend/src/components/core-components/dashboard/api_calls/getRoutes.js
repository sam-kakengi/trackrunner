import axios from 'axios'

/**
 * Fetches routes from the API.
 * @returns {Promise<Array>} The array of route objects.
 */

const API_BASE_URL = 'http://localhost:8000'

const fetchRoutes = async () => {
  try {
    const token = localStorage.getItem('token')

    if (!token) {
      console.error('No token found')
      return []
    }

    const response = await axios.get(`${API_BASE_URL}/api/run/routes/`, {
      headers: {
        'Authorization': `Token ${token}`,
      },
    })

    const responseRoutesArray = Object.values(response.data)
    return responseRoutesArray

  } catch (error) {
    console.error("Couldn't retrieve response for routes")
    return []
  }
}

export default fetchRoutes
