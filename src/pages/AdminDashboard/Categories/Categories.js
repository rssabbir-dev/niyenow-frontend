import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';

const Categories = () => {
	const { user } = useSelector((state) => state.auth);
	const { data: products, isLoading } = useQuery({
		queryKey: ['categories', user?.uid],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/categories`,
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
	console.log(products);
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<div className='flex justify-between items-center mb-4'>
				<p className='font-bold text-lg'>Categories List</p>
				<Link
					className='btn btn-sm text-xs'
					to='/admin/categories/new-category'
				>
					New Category
				</Link>
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
								Action
							</th>
						</tr>
					</thead>

					<tbody class='divide-y divide-gray-200'>
						{products.map((pd) => (
							<tr>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									{pd.name}
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

export default Categories;
