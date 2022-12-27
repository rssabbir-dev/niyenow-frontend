import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './firebase/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/authSlice';
import { Toaster } from 'react-hot-toast';
import { cartActions } from './store/cartSlice';

function App() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);
	const {refetch} = useSelector(state => state.cart)
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			dispatch(authActions.login(JSON.stringify(currentUser)));
			// if (currentUser?.uid) {
			// 	fetch(
			// 		`${process.env.REACT_APP_API_URL}/admin?uid=${currentUser?.uid}`
			// 	)
			// 		.then((res) => res.json())
			// 		.then((data) => {
			// 			dispatch(authActions.checkAdmin(data.role));
			// 			dispatch(authActions.setAdminLoading(false));
			// 		});
			// }
			dispatch(authActions.setLoading(false));
		});
		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	useEffect(() => {
		if (user?.uid) {
			fetch(`${process.env.REACT_APP_API_URL}/get-cart/${user?.uid}`, {
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token')
						)}`,
					},
				})
				.then((res) => res.json())
				.then(data => {
					dispatch(cartActions.loadCart(data))
			})
		}
	}, [user?.uid,dispatch,refetch]);
	return (
		<div>
			<Toaster />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
