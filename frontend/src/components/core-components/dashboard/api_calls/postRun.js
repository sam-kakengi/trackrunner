import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

export const postRunData = async (runData) => {

  const token = localStorage.getItem('token')

  try {
    const response = await axios.post(`${API_BASE_URL}/api/run/running/`, runData, {
      headers: {
        'Authorization': `Token ${token}`, 
      },
    })
    console.log('Post successful')
    return response.data
  } catch (error) {
    console.error('Error posting run data')
    throw error
  }
}

export default postRunData