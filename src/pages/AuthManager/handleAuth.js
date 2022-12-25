import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';
import auth from '../../firebase/firebase.config';

export const handleEmailLogin = ({ email, password }) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const handleEmailRegister = ({ email, password }) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const handleUpdateUserProfile = (profileData) => {
	return updateProfile(auth.currentUser, profileData);
};
export const handleLogout = () => {
	return signOut(auth);
};

export const getJwtToken = (uid) => {
	fetch(`${process.env.REACT_APP_API_URL}/jwt?uid=${uid}`)
		.then((res) => res.json())
		.then((data) => {
			console.log(data.token);
			localStorage.setItem('token', JSON.stringify(data.token));
		});
};
