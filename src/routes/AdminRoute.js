import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
	const { user, userLoading, isAdmin, adminLoading } = useSelector(
		(state) => state.auth
	);
    if (adminLoading) {
        return
		// return <p className='text-8xl'>Loading....</p>;
    }
    if (!isAdmin) {
        return <Navigate to='/error' />
    }
    return children;
};

export default AdminRoute;
