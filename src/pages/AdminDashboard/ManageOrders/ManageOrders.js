import { faCreditCard, faDownload, faGear, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';

const ManageOrders = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		data: manageOrder,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['customerOrders', user?.uid],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/customers-order/${user?.uid}`,
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

	console.log(manageOrder);
	const handleUpdateStatus = (id, status) => {
		fetch(
			`${process.env.REACT_APP_API_URL}/update-status/${user.uid}?id=${id}&status=${status}`,
			{
				method: 'PATCH',
				headers: {
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem('token')
					)}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				refetch();
			});
	};
	const location = useLocation();
	if (isLoading) {
		return <SpinnerMain />;
	}

	return (
		<section>
			<div className='flex gap-10 items-center'>
				<nav className='mb-3 text-xl font-bold'>
					<Link
						to='/admin'
						className={
							location.pathname === '/admin'
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						Dashboard
					</Link>
					<span className='breadcrumb-arrow'>&gt;</span>
					<Link
						to={`/admin/manage-orders`}
						className={
							location.pathname.startsWith('/admin/manage-orders')
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						Manage Order
					</Link>
				</nav>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mb-20'>
				<div className='bg-blue-500 text-white p-5 rounded-lg flex gap-10 justify-center items-center'>
					<div className=''>
						<FontAwesomeIcon className='text-5xl' icon={faGear} />
					</div>
					<div>
						<h1 className='text-2xl uppercase'>Processing</h1>
						<p className='text-xl font-bold'>
							{manageOrder.count.processingCount}
						</p>
					</div>
				</div>
				<div className='bg-yellow-500 text-white p-5 rounded-lg flex gap-10 justify-center items-center'>
					<div className=''>
						<FontAwesomeIcon
							className='text-5xl'
							icon={faTruckFast}
						/>
					</div>
					<div>
						<h1 className='text-2xl uppercase'>Total Shipped</h1>
						<p className='text-xl font-bold'>
							{manageOrder.count.shippedCount}
						</p>
					</div>
				</div>
				<div className='bg-red-500 text-white p-5 rounded-lg flex gap-10 justify-center items-center'>
					<div className=''>
						<FontAwesomeIcon
							className='text-5xl'
							icon={faCreditCard}
						/>
					</div>
					<div>
						<h1 className='text-2xl uppercase'>Pay Pending</h1>
						<p className='text-xl font-bold'>
							{manageOrder.count.paymentPendingCount}
						</p>
					</div>
				</div>
			</div>
			<div class='overflow-hidden overflow-x-auto rounded-lg border border-gray-200'>
				<table class='min-w-full divide-y divide-gray-200 text-sm mb-36'>
					<thead class='bg-gray-300'>
						<tr>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
								<div class='flex items-center gap-2'>
									OrderID
									<svg
										xmlns='http://www.w3.org/2000/svg'
										class='h-4 w-4 text-gray-700'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fill-rule='evenodd'
											d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
											clip-rule='evenodd'
										/>
									</svg>
								</div>
							</th>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
								<div class='flex items-center gap-2'>
									Date
									<svg
										xmlns='http://www.w3.org/2000/svg'
										class='h-4 w-4 text-gray-700'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fill-rule='evenodd'
											d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
											clip-rule='evenodd'
										/>
									</svg>
								</div>
							</th>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
								<div class='flex items-center gap-2'>
									Amount
									<svg
										xmlns='http://www.w3.org/2000/svg'
										class='h-4 w-4 text-gray-700'
										viewBox='0 0 20 20'
										fill='currentColor'
									>
										<path
											fill-rule='evenodd'
											d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
											clip-rule='evenodd'
										/>
									</svg>
								</div>
							</th>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
								Status
							</th>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'></th>
						</tr>
					</thead>

					<tbody class='divide-y divide-gray-200'>
						{manageOrder?.orders?.map((pd) => (
							<tr>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									#{pd._id}
								</td>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									{format(new Date(pd.createAt), 'Pp')}
								</td>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									${pd.subTotal}
								</td>
								{/* <td class='whitespace-nowrap px-4 py-2'>
									<strong class='rounded bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700'>
										{pd.product_info?.product_quantity} Left
									</strong>
								</td> */}
								<td class='whitespace-nowrap px-4 py-2'>
									<div className='dropdown dropdown-hover dropdown-left'>
										<label
											tabIndex={0}
											className='btn btn-ghost'
										>
											{!pd.payment_status && (
												<strong class='rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700'>
													{pd.order_status}
												</strong>
											)}
											{pd.payment_status && (
												<strong
													class={`rounded px-3 py-1.5 text-xs font-medium ${
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
										</label>
										{pd.payment_status && (
											<ul
												tabIndex={0}
												className='dropdown-content menu p-2 gap-3 shadow bg-base-100 rounded-box w-52'
											>
												<li className='bg-yellow-100 text-yellow-700'>
													<button
														onClick={() =>
															handleUpdateStatus(
																pd._id,
																'shipped'
															)
														}
													>
														Shipped
													</button>
												</li>
												<li className='bg-green-100 text-green-700'>
													<button
														onClick={() =>
															handleUpdateStatus(
																pd._id,
																'delivered'
															)
														}
													>
														Delivered
													</button>
												</li>
											</ul>
										)}
									</div>
								</td>
								{/* <td>
									<div className='dropdown dropdown-hover dropdown-left'>
										<label tabIndex={0} className='btn m-1'>
											update
										</label>
										<ul
											tabIndex={0}
											className='dropdown-content menu p-2 gap-3 shadow bg-base-100 rounded-box w-52'
										>
											<li className='bg-yellow-100 text-yellow-700'>
												<button
													onClick={() =>
														handleUpdateStatus(
															pd._id,
															'shipped'
														)
													}
												>
													Shipped
												</button>
											</li>
											<li className='bg-green-100 text-green-700'>
												<button
													onClick={() =>
														handleUpdateStatus(
															pd._id,
															'delivered'
														)
													}
												>
													Delivered
												</button>
											</li>
										</ul>
									</div>
								</td> */}
								<td class='whitespace-nowrap px-4 py-2'>
									<Link
										className='text-blue-500'
										to={`/admin/order/details/${pd._id}`}
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
	);
};

export default ManageOrders;
