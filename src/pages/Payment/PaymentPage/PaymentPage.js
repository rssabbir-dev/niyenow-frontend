import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const PaymentPage = () => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);
	const { user } = useSelector((state) => state.auth);
	const [order, setOrder] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [subTotal, setSubTotal] = useState(0);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/get-orders/${user?.uid}`, {
			headers: {
				authorization: `Bearer ${JSON.parse(
					localStorage.getItem('token')
				)}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setOrder(data);
				setIsLoading(false);
				const total = data.ordered_products.reduce(
					(prev, curr) => prev + parseInt(curr.product_info.price),
					0
				);
				setSubTotal(total);
			});
	}, [user?.uid]);
	console.log(order);
	return (
		<>
			<Elements stripe={stripePromise}>
				<CheckoutForm
					order={order}
					subTotal={subTotal}
				/>
			</Elements>

			{/* {order.order_status && <OrderSuccess />} */}
		</>
	);
};

export default PaymentPage;
