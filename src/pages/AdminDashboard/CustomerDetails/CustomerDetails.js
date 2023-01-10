import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';

const CustomerDetails = () => {
	const { user } = useSelector((state) => state.auth);
	const param = useParams();
	const [customerOrders, setCustomerOrders] = useState([]);
	const [customer, setCustomer] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();
	useEffect(() => {
		setIsLoading(true);
		fetch(
			`${process.env.REACT_APP_API_URL}/customers/details/${user?.uid}?customerUid=${param.customerUid}`,
			{
				headers: {
					authorization: `Bearer ${JSON.parse(
						localStorage.getItem('token')
					)}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				setCustomerOrders(data.customerOrders);
				setCustomer(data.customer);
				setIsLoading(false);
			});
	}, [param.customerUid, user?.uid]);
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<div className=' mb-4'>
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
						to={`/admin/customers/`}
						className={'breadcrumb-not-active'}
					>
						Customers List
					</Link>
					<span className='breadcrumb-arrow'>&gt;</span>
					<Link
						to={`/admin/customers/details/${param.customerUid}`}
						className={
							location.pathname.startsWith(
								'/admin/customers/details'
							)
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						{customer?.displayName}
					</Link>
				</nav>
			</div>

			<div className='overflow-hidden overflow-x-auto rounded-lg border border-gray-200'>
				<table className='min-w-full divide-y divide-gray-200 text-sm'>
					<thead className='bg-gray-300'>
						<tr>
							<th className='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
								<div className='flex items-center gap-2'>
									#Order Id
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
									Total Pay
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
									Order Status
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
									Order Date
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
								Action
							</th>
						</tr>
					</thead>

					<tbody className='divide-y divide-gray-200'>
						{!customerOrders.length && (
							<div className='p-5 italic font-bold text-gray-500'>
								Nothings found for {customer.displayName}
							</div>
						)}
						{customerOrders.map((pd) => (
							<tr key={pd._id}>
								<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
									#{pd._id}
								</td>
								<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
									${pd.subTotal}
								</td>
								<td className='whitespace-nowrap px-4 py-2'>
									<strong
										className={`rounded px-3 py-1.5 text-xs font-medium ${
											pd.order_status === 'processing' &&
											'text-blue-700 bg-blue-100'
										} ${
											pd.order_status === 'shipped' &&
											'text-yellow-700 bg-yellow-100'
										} ${
											pd.order_status === 'delivered' &&
											'text-green-700 bg-green-100'
										} ${
											pd.order_status ===
												'payment pending' &&
											'text-red-700 bg-red-100'
										}`}
									>
										{pd.order_status}
									</strong>
								</td>
								<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
									{format(new Date(pd.createAt), 'Pp')}
								</td>
								<td className='whitespace-nowrap px-4 py-2'>
									<Link
										to={`/admin/order/details/${pd._id}`}
										className='text-blue-500'
									>
										View Details
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

export default CustomerDetails;
