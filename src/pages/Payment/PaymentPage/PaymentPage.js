import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import OrderSuccess from '../OrderSuccess/OrderSuccess';

const PaymentPage = () => {
	const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET);
	const { user } = useSelector((state) => state.auth);
	const [order, setOrder] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [refetch,setRefetch] = useState(0)
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
			});
	}, [param.id, user?.uid,refetch]);
	return (
		<>
			{!order.payment_status && (
				<Elements stripe={stripePromise}>
					<CheckoutForm setRefetch={setRefetch} order={order} />
				</Elements>
			)}

			{order.payment_status && (
				<OrderSuccess transactionId={order.transactionId} />
			)}
		</>
	);
};

export default PaymentPage;
