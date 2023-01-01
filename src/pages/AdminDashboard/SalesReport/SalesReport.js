import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';

const SalesReport = () => {
	const { user } = useSelector((state) => state.auth);
	const { data: sales, isLoading } = useQuery({
		queryKey: ['salesReport', user?.uid],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/sales-report/${user?.uid}`,
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
	const location = useLocation()
	if (isLoading) {
		return <SpinnerMain />;
	}
	const totalIncome = sales.reduce((prev, curr) => prev + curr.price, 0);
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
						to={`/admin/sales-report`}
						className={
							location.pathname.startsWith('/admin/sales-report')
								? 'breadcrumb-active'
								: 'breadcrumb-not-active'
						}
					>
						Sales Report
					</Link>
				</nav>
			</div>

			<div class='overflow-hidden overflow-x-auto rounded-lg border border-gray-200'>
				<table class='min-w-full divide-y divide-gray-200 text-sm'>
					<thead class='bg-gray-300'>
						<tr>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
								<div class='flex items-center gap-2'>
									Name
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
									Email
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
									Total Pay
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
								Date
							</th>
						</tr>
					</thead>

					<tbody class='divide-y divide-gray-200'>
						{sales.map((pd) => (
							<tr>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									{pd.name}
								</td>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									{pd.email}
								</td>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									${pd.price}
								</td>
								<td class='whitespace-nowrap px-4 py-2'>
									{format(new Date(pd.createAt), 'Pp')}
								</td>
							</tr>
						))}
					</tbody>
					<tfoot class='bg-gray-200'>
						<tr>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'></th>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'></th>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
								Total Income
							</th>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'>
								${totalIncome}
							</th>
						</tr>
					</tfoot>
				</table>
			</div>
		</section>
	);
};

export default SalesReport;
