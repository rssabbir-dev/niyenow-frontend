import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SpinnerMain from '../../../../../components/SpinnerMain/SpinnerMain';

const MyOrder = () => {
	const { user } = useSelector((state) => state.auth);
	const { data: orders, isLoading } = useQuery({
		queryKey: ['myOrder', user?.uid],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/my-order/${user?.uid}`,
				{
					headers: {
						authorization: `Bearer ${JSON.parse(
							localStorage.getItem('token')
						)}`,
					},
				}
			);
			const data = await res.json();
			return data;
		},
	});
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<>
			{!orders.length > 0 && <div>You didn't order yet</div>}
			{orders.length > 0 && (
				<section>
					<div className='flex justify-between items-center mb-4'>
						<p className='font-bold text-lg'>My Orders</p>
					</div>

					<div className='overflow-hidden overflow-x-auto rounded-lg border border-gray-200'>
						<table className='min-w-full divide-y divide-gray-200 text-sm'>
							<thead className='bg-gray-300'>
								<tr>
									<th className='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
										<div className='flex items-center gap-2'>
											OrderID
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-4 w-4 text-gray-700'
												viewBox='0 0 20 20'
												fill='currentColor'
											>
												<path
													fillRule='evenodd'
													d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
									</th>
									<th className='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
										<div className='flex items-center gap-2'>
											Date
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-4 w-4 text-gray-700'
												viewBox='0 0 20 20'
												fill='currentColor'
											>
												<path
													fillRule='evenodd'
													d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
									</th>
									<th className='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
										<div className='flex items-center gap-2'>
											Amount
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-4 w-4 text-gray-700'
												viewBox='0 0 20 20'
												fill='currentColor'
											>
												<path
													fillRule='evenodd'
													d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
													clipRule='evenodd'
												/>
											</svg>
										</div>
									</th>
									<th className='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
										Status
									</th>
									<th className='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'></th>
								</tr>
							</thead>

							<tbody className='divide-y divide-gray-200'>
								{orders.map((pd) => (
									<tr key={pd._id}>
										<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
											#{pd._id}
										</td>
										<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
											{format(
												new Date(pd.createAt),
												'Pp'
											)}
										</td>
										<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
											${pd.subTotal}
										</td>
										{/* <td className='whitespace-nowrap px-4 py-2'>
									<strong className='rounded bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700'>
										{pd.product_info?.product_quantity} Left
									</strong>
								</td> */}
										<td className='whitespace-nowrap px-4 py-2'>
											{!pd.payment_status && (
												<Link
													to={`/payment/${pd._id}`}
													className='btn btn-sm'
												>
													Pay
												</Link>
											)}
											{pd.payment_status && (
												<strong
													className={`rounded px-3 py-1.5 text-xs font-medium ${
														pd.order_status ===
															'processing' &&
														'text-blue-700 bg-blue-100'
													} ${
														pd.order_status ===
															'shipped' &&
														'text-yellow-700 bg-yellow-100'
													} ${
														pd.order_status ===
															'delivered' &&
														'text-green-700 bg-green-100'
													}`}
												>
													{
														pd.product_info
															?.product_quantity
													}{' '}
													{pd.order_status}
												</strong>
											)}
										</td>
										<td className='whitespace-nowrap px-4 py-2'>
											<Link
												className='text-blue-500'
												to={`/customer/my-order/details/${pd._id}`}
											>
												View
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</section>
			)}
		</>
	);
};

export default MyOrder;
