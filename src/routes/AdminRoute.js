import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SpinnerMain from '../components/SpinnerMain/SpinnerMain';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
	const [isAdmin, isAdminLoading] = useAdmin();
	if (isAdminLoading) {
		return <SpinnerMain />;
	}
	if (!isAdmin) {
		return <Navigate to='/error' />;
	}
	return children;
};

export default AdminRoute;
