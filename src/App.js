import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from './firebase/firebase.config';
import { useDispatch } from 'react-redux';
import { authActions } from './store/authSlice';
import { Toaster } from 'react-hot-toast';

function App() {
	const dispatch = useDispatch();
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
            dispatch(authActions.setAdminLoading(false))
					});
			}
			dispatch(authActions.setLoading(false));
		});
		return () => {
			unsubscribe();
		};
	}, [dispatch]);
	return (
		<div>
			<Toaster />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
