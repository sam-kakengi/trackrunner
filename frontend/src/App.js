import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom'
import LoginPage from './pages/authentication/LoginPage';
import RegistrationPage from './pages/authentication/RegisterPage';
import DashboardPage from './pages/core/DashboardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* landing page route */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* login route */}
        <Route path="/login" element={<LoginPage />} />

        {/* registration route */}
        <Route path="/register" element={<RegistrationPage />} />

        {/* dashboard route */}
        <Route path="/dashboard" element={<DashboardPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;
