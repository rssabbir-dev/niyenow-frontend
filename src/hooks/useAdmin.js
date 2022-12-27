import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAdmin = () => {
	const { user } = useSelector((state) => state.auth);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAdminLoading, setAdminLoading] = useState(true);
	useEffect(() => {
		setAdminLoading(true);
		if (user?.uid) {
			fetch(`${process.env.REACT_APP_API_URL}/admin?uid=${user?.uid}`)
				.then((res) => res.json())
				.then((data) => {
					setIsAdmin(data.role === 'admin');
                    setAdminLoading(false);
				});
		}
	}, [user?.uid]);
	return [isAdmin, isAdminLoading];
};
export default useAdmin;
