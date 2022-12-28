import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const CheckoutForm = ({ order, subTotal }) => {
	document.title = 'Make Payment - Admin Dashboard';
	const stripe = useStripe();
	const elements = useElements();
	const { user } = useSelector((state) => state.auth);

	const [cardError, setCardError] = useState('');
	const [processing, setProcessing] = useState(false);
	const [clientSecret, setClientSecret] = useState('');
	useEffect(() => {
		if (order._id && user?.uid) {
			fetch(
				`${process.env.REACT_APP_API_URL}/create-payment-intent/${user?.uid}?id=${order._id}`,
				{
					method: 'POST',
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token')
						)}`,
					},
				}
			)
				.then((res) => res.json())
				.then((data) => {
					setClientSecret(data.clientSecret);
				});
		}
	}, [order._id, user?.uid]);
	const handlePayment = async (event) => {
		event.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const card = elements.getElement(CardElement);

		if (card === null) {
			return;
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});
		if (error) {
			console.log(error);
			setCardError(error.message);
			setProcessing(false);
		} else {
			setCardError('');
			setProcessing(true);
		}
		const { paymentIntent, error: confirmError } =
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: card,
					billing_details: {
						name: user.displayName,
						email: user.email,
					},
				},
			});

		if (confirmError) {
			setCardError(confirmError.message);
			return;
		}
		if (paymentIntent.status === 'succeeded') {
			const payment = {
				price: subTotal,
				transactionId: paymentIntent.id,
				email: user.email,
				orderId: order._id,
			};
			fetch(`${process.env.REACT_APP_API_URL}/payments/${user?.uid}`, {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem('token')
					)}`,
				},
				body: JSON.stringify(payment),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.insertedId) {
						Swal.fire(
							'Congrats! your payment completed',
							`${paymentIntent.id}`,
							'success'
						);
					}
				});
		}
		setProcessing(false);
	};
	return (
		<div className='h-[500px]'>
			<div className='w-96 mx-auto p-10 my-20 shadow-md'>
				<div className='mb-5'>
					<p className='text-2xl'>Product Info</p>
					<h1 className='text-lg'>
						Payment for {order._id}
					</h1>
					<p>Price: ${subTotal}</p>
				</div>
				<form onSubmit={handlePayment}>
					<CardElement
						options={{
							style: {
								base: {
									fontSize: '16px',
									color: '#424770',
									'::placeholder': {
										color: '#aab7c4',
									},
								},
								invalid: {
									color: '#9e2146',
								},
							},
						}}
					/>
					<button
						className='btn btn-sm mt-9 btn-primary btn-block '
						type='submit'
						disabled={!stripe || !clientSecret || processing}
					>
						Pay
					</button>
				</form>
				<p className='text-red-500'>{cardError}</p>
			</div>
		</div>
	);
};

export default CheckoutForm;
