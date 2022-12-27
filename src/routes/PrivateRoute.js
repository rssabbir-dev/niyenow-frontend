import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import SpinnerMain from '../components/SpinnerMain/SpinnerMain';

const PrivateRoute = ({ children }) => {
	const location = useLocation();
	const { user, userLoading } = useSelector((state) => state.auth);

	if (userLoading) {
		return <SpinnerMain />;
	}

	if (!user?.uid) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}
	return children;
};

export default PrivateRoute;
