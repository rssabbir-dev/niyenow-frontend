import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
	console.log(AllCustomer);
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<div className=' mb-4'>
				<p className='font-bold text-lg'>Customer List</p>
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
									Total Order
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
						</tr>
					</thead>

					<tbody class='divide-y divide-gray-200'>
						{customers.map((pd) => (
							<tr>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									{pd.displayName}
								</td>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									{pd.email}
								</td>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									7
								</td>
								<td class='whitespace-nowrap px-4 py-2'>
									<div className='dropdown dropdown-left dropdown-end'>
										<label tabIndex={0} className='btn m-1'>
											Click
										</label>
										<ul
											tabIndex={0}
											className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52'
										>
											<li>
												<a>Item 1</a>
											</li>
											<li>
												<a>Item 2</a>
											</li>
										</ul>
									</div>
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
