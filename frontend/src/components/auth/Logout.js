import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


/**
 * Handles the logout functionality.
 * 
 * This function is responsible for removing the 'token' and 'userInfo' from the local storage,
 * setting the 'logoutAlert' to 'true' in the local storage, and navigating the user to the home page ('/').
 * 
 * @returns {null} Returns null.
 */

const HandleLogout = ({ setIsAuthenticated }) => {
    const navigate = useNavigate()
  
    useEffect(() => {
      const performLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userInfo')
        localStorage.setItem('logoutAlert', 'true')
        if (typeof setIsAuthenticated === 'function') {
          setIsAuthenticated(false)
        } else {
          console.error('setIsAuthenticated is not a function')
        }
        navigate('/login')
      };
  
      performLogout()
    }, [navigate, setIsAuthenticated])
  
    return null
  };
  
  export default HandleLogout