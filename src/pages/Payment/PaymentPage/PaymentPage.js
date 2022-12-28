import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const PaymentPage = () => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);
	const { user } = useSelector((state) => state.auth);
	const [order, setOrder] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
    const [subTotal, setSubTotal] = useState(0);
    const param = useParams()
	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/order/${user?.uid}?id=${param.id}`, {
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
	}, [param.id, user?.uid]);
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
