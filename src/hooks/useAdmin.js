import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAdmin = () => {
	const { user } = useSelector((state) => state.auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminLoading,setAdminLoading] = useState(true)
    useEffect(() => {
        setAdminLoading(true)
        if (user) {
            fetch(`${process.env.REACT_APP_API_URL}/admin?uid=${user.uid}`)
            .then(res => res.json())
                .then(data => {
                    console.log(data);
                    adminLoading()
            })
		}
    }, [user]);
    return
};
export default useAdmin;
