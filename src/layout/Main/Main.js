import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import auth from '../../firebase/firebase.config';
import Footer from '../../pages/shared/Footer/Footer';
import Navbar from '../../pages/shared/Navbar/Navbar';
import { authActions } from '../../store/authSlice';
import { cartActions } from '../../store/cartSlice';

const Main = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const { refetch } = useSelector((state) => state.cart);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			dispatch(authActions.login(JSON.stringify(currentUser)));
			if (currentUser?.uid) {
				fetch(
					`${process.env.REACT_APP_API_URL}/admin?uid=${currentUser?.uid}`
				)
					.then((res) => res.json())
					.then((data) => {
						dispatch(authActions.checkAdmin(data.role));
						dispatch(authActions.setAdminLoading(false));
					});
			}
			dispatch(authActions.setLoading(false));
		});
		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	useEffect(() => {
		if (user?.displayName) {
			fetch(`${process.env.REACT_APP_API_URL}/get-cart/${user?.uid}`, {
				headers: {
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem('token')
					)}`,
				},
			})
				.then((res) => res.json())
				.then((data) => {
					dispatch(cartActions.loadCart(data.cart));
				});
		}
	}, [dispatch, refetch, user?.displayName]);
    return (
		<div>
			<Navbar/>
            <Outlet />
            <Footer/>
		</div>
	);
};

export default Main;