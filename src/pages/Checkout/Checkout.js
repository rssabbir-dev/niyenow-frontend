// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// const Checkout = () => {
// 	const { user } = useSelector((state) => state.auth);
// 	const [orders, setOrders] = useState([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [subTotal, setSubTotal] = useState(0);
// 	useEffect(() => {
// 		fetch(`${process.env.REACT_APP_API_URL}/get-orders/${user?.uid}`, {
// 			headers: {
// 				authorization: `Bearer ${JSON.parse(
// 					localStorage.getItem('token')
// 				)}`,
// 			},
// 		})
// 			.then((res) => res.json())
// 			.then((data) => {
// 				setOrders(data.ordered_products);
// 				setIsLoading(false);
// 				const total = data.ordered_products.reduce(
// 					(prev, curr) => prev + parseInt(curr.product_info.price),
// 					0
// 				);
// 				setSubTotal(total);
// 			});
// 	}, [user?.uid]);
// 	console.log(orders);
// 	return (
// 		<section>
// 			<h1 className='sr-only'>Checkout</h1>

// 			<div className='grid grid-cols-1 mx-auto max-w-screen-2xl md:grid-cols-2'>
// 				<div className='py-12 bg-gray-50 md:py-24'>
// 					<div className='max-w-lg px-4 mx-auto space-y-8 lg:px-8'>
// 						<div className='flex items-center'>
// 							<span className='w-10 h-10 bg-blue-700 rounded-full'></span>

// 							<h2 className='ml-4 font-medium text-gray-900'>
// 								BambooYou
// 							</h2>
// 						</div>

// 						<div>
// 							<p className='text-2xl font-medium tracking-tight text-gray-900'>
// 								${subTotal}
// 							</p>

// 							<p className='mt-1 text-sm text-gray-600'>
// 								For the purchase of
// 							</p>
// 						</div>

// 						<div>
// 							<div className='flow-root'>
// 								<ul className='-my-4 divide-y divide-gray-100'>
// 									{orders.map((pd) => (
// 										<li className='flex items-center py-4'>
// 											<img
// 												src={pd.product_info?.image}
// 												alt=''
// 												className='object-cover w-16 h-16 rounded'
// 											/>

// 											<div className='ml-4'>
// 												<h3 className='text-sm text-gray-900'>
// 													{pd.product_info?.name}
// 												</h3>

// 												<dl className='mt-0.5 space-y-px text-[10px] text-gray-600'>
// 													<div>
// 														<dt className='inline'>
// 															Price:
// 														</dt>
// 														<dd className='inline'>
// 															{
// 																pd.product_info
// 																	?.price
// 															}
// 														</dd>
// 													</div>

// 													<div>
// 														<dt className='inline'>
// 															Category:
// 														</dt>
// 														<dd className='inline'>
// 															{
// 																pd.product_info
// 																	?.category
// 															}
// 														</dd>
// 													</div>
// 												</dl>
// 											</div>
// 										</li>
// 									))}
// 								</ul>
// 							</div>
// 						</div>
// 					</div>
// 				</div>

// 				<div className='py-12 bg-white md:py-24'>
// 					<div className='max-w-lg px-4 mx-auto lg:px-8'>
// 						<form className='grid grid-cols-6 gap-4'>
// 							<div className='col-span-3'>
// 								<label
// 									for='FirstName'
// 									className='block text-xs font-medium text-gray-700'
// 								>
// 									First Name
// 								</label>

// 								<input
// 									type='text'
// 									id='FirstName'
// 									className='w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm'
// 								/>
// 							</div>

// 							<div className='col-span-3'>
// 								<label
// 									for='LastName'
// 									className='block text-xs font-medium text-gray-700'
// 								>
// 									Last Name
// 								</label>

// 								<input
// 									type='text'
// 									id='LastName'
// 									className='w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm'
// 								/>
// 							</div>

// 							<div className='col-span-6'>
// 								<label
// 									for='Email'
// 									className='block text-xs font-medium text-gray-700'
// 								>
// 									Email
// 								</label>

// 								<input
// 									type='email'
// 									id='Email'
// 									className='w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm'
// 								/>
// 							</div>

// 							<div className='col-span-6'>
// 								<label
// 									for='Phone'
// 									className='block text-xs font-medium text-gray-700'
// 								>
// 									Phone
// 								</label>

// 								<input
// 									type='tel'
// 									id='Phone'
// 									className='w-full mt-1 border-gray-200 rounded-md shadow-sm sm:text-sm'
// 								/>
// 							</div>

// 							<fieldset className='col-span-6'>
// 								<legend className='block text-sm font-medium text-gray-700'>
// 									Card Details
// 								</legend>

// 								<div className='mt-1 -space-y-px bg-white rounded-md shadow-sm'>
// 									<div>
// 										<label for='CardNumber' className='sr-only'>
// 											{' '}
// 											Card Number{' '}
// 										</label>

// 										<input
// 											type='text'
// 											id='CardNumber'
// 											placeholder='Card Number'
// 											className='relative w-full mt-1 border-gray-200 rounded-t-md focus:z-10 sm:text-sm'
// 										/>
// 									</div>

// 									<div className='flex -space-x-px'>
// 										<div className='flex-1'>
// 											<label
// 												for='CardExpiry'
// 												className='sr-only'
// 											>
// 												{' '}
// 												Card Expiry{' '}
// 											</label>

// 											<input
// 												type='text'
// 												id='CardExpiry'
// 												placeholder='Expiry Date'
// 												className='relative w-full border-gray-200 rounded-bl-md focus:z-10 sm:text-sm'
// 											/>
// 										</div>

// 										<div className='flex-1'>
// 											<label
// 												for='CardCVC'
// 												className='sr-only'
// 											>
// 												{' '}
// 												Card CVC{' '}
// 											</label>

// 											<input
// 												type='text'
// 												id='CardCVC'
// 												placeholder='CVC'
// 												className='relative w-full border-gray-200 rounded-br-md focus:z-10 sm:text-sm'
// 											/>
// 										</div>
// 									</div>
// 								</div>
// 							</fieldset>

// 							<fieldset className='col-span-6'>
// 								<legend className='block text-sm font-medium text-gray-700'>
// 									Billing Address
// 								</legend>

// 								<div className='mt-1 -space-y-px bg-white rounded-md shadow-sm'>
// 									<div>
// 										<label for='Country' className='sr-only'>
// 											Country
// 										</label>

// 										<select
// 											id='Country'
// 											className='relative w-full border-gray-200 rounded-t-md focus:z-10 sm:text-sm'
// 										>
// 											<option>England</option>
// 											<option>Wales</option>
// 											<option>Scotland</option>
// 											<option>France</option>
// 											<option>Belgium</option>
// 											<option>Japan</option>
// 										</select>
// 									</div>

// 									<div>
// 										<label className='sr-only' for='PostalCode'>
// 											{' '}
// 											ZIP/Post Code{' '}
// 										</label>

// 										<input
// 											type='text'
// 											id='PostalCode'
// 											placeholder='ZIP/Post Code'
// 											className='relative w-full border-gray-200 rounded-b-md focus:z-10 sm:text-sm'
// 										/>
// 									</div>
// 								</div>
// 							</fieldset>

// 							<div className='col-span-6'>
// 								<button className='block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg'>
// 									Pay Now
// 								</button>
// 							</div>
// 						</form>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// };

// export default Checkout;
