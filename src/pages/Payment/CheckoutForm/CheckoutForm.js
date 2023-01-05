import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const CheckoutForm = ({ order, setRefetch }) => {
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
				name: user.displayName,
				price: order.subTotal,
				transactionId: paymentIntent.id,
				email: user.email,
				orderId: order._id,
				address: form.address1.value,
				phone: form.phone_number.value,
				createAt: new Date(),
				ordered_products: order?.ordered_products?.map((pd) => [
					pd.product_info.id,
					pd.product_info.quantity,
				]),
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
					setRefetch((state) => state + 1);
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
	console.log(
		order?.ordered_products?.map((pd) => [pd._id, pd.product_info.quantity])
	);
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
							<p>Price: ${order.subTotal}</p>
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
						{!processing && (
							<button
								className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full mt-5'
								type='submit'
								disabled={
									!stripe || !clientSecret || processing
								}
							>
								Pay
							</button>
						)}
						{processing && (
							<button
								disabled
								type='button'
								className='ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full mt-5'
							>
								<svg
									role='status'
									className='inline mr-3 w-4 h-4 text-white animate-spin'
									viewBox='0 0 100 101'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
										fill='#E5E7EB'
									/>
									<path
										d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
										fill='currentColor'
									/>
								</svg>
								Loading...
							</button>
						)}
					</div>
				</form>
				<p className='text-red-500'>{cardError}</p>
			</div>
		</div>
	);
};

export default CheckoutForm;
