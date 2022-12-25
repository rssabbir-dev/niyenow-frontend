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
    return signOut(auth)
}
