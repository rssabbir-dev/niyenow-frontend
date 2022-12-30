// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { cartActions } from '../store/cartSlice';

// const useCart = () => {
// 	const { user } = useSelector((state) => state.auth);
// 	const { refetch } = useSelector((state) => state.cart);
// 	const dispatch = useDispatch();
// 	useEffect(() => {
// 		if (user?.uid) {
// 			fetch(`${process.env.REACT_APP_API_URL}/get-cart/${user?.uid}`, {
// 				headers: {
// 					authorization: `Bearer ${JSON.parse(
// 						localStorage.getItem('token')
// 					)}`,
// 				},
// 			})
// 				.then((res) => res.json())
// 				.then((data) => {
// 					dispatch(cartActions.loadCart(data));
// 				});
// 		}
//     }, [user?.uid, dispatch, refetch]);
//     return;
// };

// export default useCart;
