import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
import LoginPage from './pages/authentication/LoginPage'
import RegistrationPage from './pages/authentication/RegisterPage'
import DashboardPage from './pages/core/DashboardPage'
import ProtectedRoute from './components/auth/ProtectedRouteComp'
import HandleLogout from './components/auth/Logout'
import PublicRoute from './components/auth/PublicRouteComp'
import { ActiveRunProvider } from './components/core-components/context/ActiveRun'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <ActiveRunProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <RegistrationPage />
            </PublicRoute>
          } />

          {/* Logout route */}
          <Route path="/logout" element={<HandleLogout setIsAuthenticated={setIsAuthenticated} />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<DashboardPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/dashboard" element={<DashboardPage setIsAuthenticated={setIsAuthenticated} />} />
          </Route>

          {/* Redirects all other routes to the dashboard if authenticated, otherwise sent to login */}
          <Route path="*" element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ActiveRunProvider>
  )
}

export default App