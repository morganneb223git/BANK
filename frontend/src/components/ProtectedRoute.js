// Protected Route ./src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth0(); // Use the useAuth0 hook to get the authentication state

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
