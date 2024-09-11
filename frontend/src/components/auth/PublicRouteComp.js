import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ isAuthenticated, children }) => {
  return !isAuthenticated ? children : <Navigate to="/dashboard" />
};

export default PublicRoute