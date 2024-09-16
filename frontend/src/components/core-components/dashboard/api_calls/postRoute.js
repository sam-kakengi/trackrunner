import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

const postRoute = async (routeName, routeDistance) => {

    const token = localStorage.getItem('token')

    try {
        const response = await axios.post(`${API_BASE_URL}/api/run/routes/`, 
            {
              name: routeName,
              distance: routeDistance,
            },
            {
              headers: {
                'Authorization': `Token ${token}`, 
              },
            }
          )

        console.log('Route successfully posted')
        return response.data
    } catch(error) {
        console.error("Couldn't retrieve response for routes")
    }
    }

export default postRoute