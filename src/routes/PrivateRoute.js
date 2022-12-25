import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
	const location = useLocation();
    const { user,userLoading } = useSelector((state) => state.auth);
    
    if (userLoading) {
        return <p className='text-8xl'>Loading...</p>
    }
    
	if (!user?.uid) {
		return <Navigate to='/login' state={{ from: location }} replace />;
    }
    return children;
};

export default PrivateRoute;
