import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../../pages/shared/Footer/Footer';
import Navbar from '../../pages/shared/Navbar/Navbar';

const Main = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
    return (
		<div>
			<Navbar/>
            <Outlet />
            <Footer/>
		</div>
	);
};

export default Main;