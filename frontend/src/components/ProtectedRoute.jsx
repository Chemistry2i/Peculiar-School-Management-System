import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('authToken');
    
    // If there is no token, redirect to the login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // If a token exists, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
