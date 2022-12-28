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
		const form = event.target;
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
				name:user.displayName,
				price: subTotal,
				transactionId: paymentIntent.id,
				email: user.email,
				orderId: order._id,
				address: form.address1.value,
				phone:form.phone_number.value
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
		<div className=''>
			<div className='mx-auto p-10 shadow-md'>
				<h1 className='text-2xl mb-5'>Payment</h1>
				<form
					onSubmit={handlePayment}
					className='space-y-10 grid grid-cols-3 gap-10 '
				>
					<div className='col-span-2 space-y-10'>
						<div className='grid grid-cols-2 gap-5'>
							<div className='flex flex-col gap-2'>
								<label htmlFor='address'>First Name</label>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full max-w-xs'
									name='first_name'
									defaultValue={
										user?.displayName.split(' ')[0]
									}
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<label htmlFor='address'>Last Name</label>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full max-w-xs'
									name='last_name'
									defaultValue={
										user?.displayName.split(' ')[1]
									}
								/>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-5'>
							<div className='flex flex-col gap-2'>
								<label htmlFor='address'>Address</label>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full max-w-xs'
									name='address1'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<label htmlFor='address'>Address 2</label>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full max-w-xs'
									name='address2'
								/>
							</div>
						</div>
						<div className='grid grid-cols-2 gap-5'>
							<div className='flex flex-col gap-2'>
								<label htmlFor='address'>Phone Number</label>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full max-w-xs'
									name='phone_number'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<label htmlFor='address'>Email</label>
								<input
									type='text'
									placeholder='Type here'
									className='input input-bordered w-full max-w-xs'
									name='email'
									defaultValue={user?.email}
								/>
							</div>
						</div>
					</div>

					<div>
						<div className='mb-5'>
							<p className='text-2xl'>Order Info</p>
							<h1 className='text-lg'>Payment for {order._id}</h1>
							<p>Price: ${subTotal}</p>
						</div>
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
					</div>
				</form>
				<p className='text-red-500'>{cardError}</p>
			</div>
		</div>
	);
};

export default CheckoutForm;
