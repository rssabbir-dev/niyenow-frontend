import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';

const AdminProducts = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		data: products,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['adminProducts', user?.uid],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/admin-products/${user?.uid}`,
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
	const handleDeleteProduct = (id) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!',
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(
					`${process.env.REACT_APP_API_URL}/product/${user?.uid}?id=${id}`,
					{
						method: 'DELETE',
						headers: {
							authorization: `Bearer ${JSON.parse(
								localStorage.getItem('token')
							)}`,
						},
					}
				)
					.then((res) => res.json())
					.then((data) => {
						if (data.acknowledged) {
							Swal.fire(
								'Deleted!',
								'Your Product has been deleted.',
								'success'
							);
							console.log(data);
							refetch();
						}
					});
			}
		});
	};
	const handleVisibility = (visibility, id) => {
		const updatedDoc = {
			visibility: !visibility,
		};
		Swal.fire({
			title: 'Are you sure?',
			text: 'Change Product Visibility?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Change!',
		}).then((result) => {
			if (result.isConfirmed) {
				fetch(
					`${process.env.REACT_APP_API_URL}/product-visibility/${user?.uid}?id=${id}`,
					{
						method: 'PATCH',
						headers: {
							'content-type': 'application/json',
							authorization: `Bearer ${JSON.parse(
								localStorage.getItem('token')
							)}`,
						},
						body: JSON.stringify(updatedDoc),
					}
				)
					.then((res) => res.json())
					.then((data) => {
						if (data.acknowledged) {
							Swal.fire(
								'Visibility Updated!',
								'Your Product has been Updated.',
								'success'
							);
							refetch();
						}
					});
			}
		});
	};
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<div className='flex justify-between items-center mb-4'>
				<p className='font-bold text-lg'>Products List</p>
				<Link
					className='btn btn-sm text-xs'
					to='/admin/products/new-product'
				>
					New Product
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
								<div class='flex items-center gap-2'>
									Category
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
								Stock
							</th>
							<th class='whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900'></th>
						</tr>
					</thead>

					<tbody class='divide-y divide-gray-200'>
						{products.map((pd) => (
							<tr>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									{`${pd.product_info?.product_name.slice(
										0,
										20
									)}...`}
								</td>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									{pd.product_info?.product_category}
								</td>
								<td class='whitespace-nowrap px-4 py-2 text-gray-700'>
									$128.99
								</td>
								<td class='whitespace-nowrap px-4 py-2'>
									<strong
										class={`rounded bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 ${
											pd.product_info?.product_quantity <
												20 && 'bg-red-100 text-red-700'
} ${
											pd.product_info?.product_quantity <
												50 &&
											'bg-yellow-100 text-yellow-700'
										}`}
									>
										{pd.product_info?.product_quantity} Left
									</strong>
								</td>
								<td class='whitespace-nowrap px-4 py-2 space-x-1 flex justify-end'>
									<Link
										to={`/admin/products/details/${pd._id}`}
										className='text-blue-500'
									>
										Edit
									</Link>
									<span>|</span>
									<button
										onClick={() =>
											handleDeleteProduct(pd._id)
										}
										className='text-red-500'
									>
										Delete
									</button>

									<span>|</span>
									{pd.visibility && (
										<button
											onClick={() =>
												handleVisibility(
													pd.visibility,
													pd._id
												)
											}
											className='text-yellow-500'
										>
											Unpublish
										</button>
									)}
									{!pd.visibility && (
										<button
											onClick={() =>
												handleVisibility(
													pd.visibility,
													pd._id
												)
											}
											className='text-green-500'
										>
											Publish
										</button>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default AdminProducts;
