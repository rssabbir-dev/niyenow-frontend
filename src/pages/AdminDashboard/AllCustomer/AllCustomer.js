import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';

const AllCustomer = () => {
	const { user } = useSelector((state) => state.auth);
	const { data: customers, isLoading } = useQuery({
		queryKey: ['allCustomer', user?.uid],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/customers/${user?.uid}`,
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
	const location = useLocation();
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
						to={`/admin/customers`}
						className={
							location.pathname.startsWith('/admin/customers')
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						Customers List
					</Link>
				</nav>
			</div>

			<div className='overflow-hidden overflow-x-auto rounded-lg border border-gray-200'>
				<table className='min-w-full divide-y divide-gray-200 text-sm'>
					<thead className='bg-gray-300'>
						<tr>
							<th className='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
								<div className='flex items-center gap-2'>
									Name
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
									Email
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
									Register Date
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
						{customers.map((pd) => (
							<tr key={pd._id}>
								<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
									{pd.displayName}
								</td>
								<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
									{pd.email}
								</td>
								<td className='whitespace-nowrap px-4 py-2 text-gray-700'>
									{format(new Date(pd.registerAt),'Pp')}
								</td>
								<td className='whitespace-nowrap px-4 py-2'>
									<Link
										to={`/admin/customers/details/${pd.uid}`}
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

export default AllCustomer;
