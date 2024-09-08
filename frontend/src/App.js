import './css/App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
import LoginPage from './pages/authentication/LoginPage';
import RegistrationPage from './pages/authentication/RegisterPage';
import DashboardPage from './pages/core/DashboardPage';
import ProtectedRoute from './components/auth-components/ProtectedRouteComp';
import HandleLogout from './components/auth-components/Logout';
import PublicRoute from './components/auth-components/PublicRouteComp';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); 
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            </PublicRoute>
          } 
        />
        <Route path="/register" element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <RegistrationPage />
            </PublicRoute>
          } 
        />

        {/* Logout route */}
        <Route path="/logout" element={<HandleLogout setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<DashboardPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={<DashboardPage setIsAuthenticated={setIsAuthenticated} />} />
        </Route>

        {/* Redirects all other routes to the dashboard if authenticated, otherwise sent to login */}
        <Route 
          path="*" 
          element={isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
