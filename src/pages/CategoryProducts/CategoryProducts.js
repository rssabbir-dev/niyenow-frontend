import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import SpinnerMain from '../../components/SpinnerMain/SpinnerMain';

const CategoryProducts = () => {
	const [cardDisplayWay,setCardDisplayWay] = useState('grid')
	const param = useParams();
	const { data: productsData, isLoading } = useQuery({
		queryKey: ['categoryProducts'],
		queryFn: async () => {
			const res = await fetch(
				`${process.env.REACT_APP_API_URL}/category-products/${param.slug}`
			);
			const data = await res.json();
			return data;
		},
	});
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<div className='max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8'>
				<header>
					<h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>
						Product Collection of {productsData.category_name}
					</h2>

					<p className='max-w-md mt-4 text-gray-500'>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Itaque praesentium cumque iure dicta incidunt est
						ipsam, officia dolor fugit natus?
					</p>
				</header>

				<div className='flex items-center justify-between mt-8'>
					<div className='flex border border-gray-100 divide-x divide-gray-100 rounded'>
						<button className='inline-flex items-center justify-center w-10 h-10 text-gray-600 transition hover:bg-gray-50 hover:text-gray-700'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-5 h-5'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z'
								/>
							</svg>
						</button>

						<button className='inline-flex items-center justify-center w-10 h-10 text-gray-600 transition hover:bg-gray-50 hover:text-gray-700'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='currentColor'
								className='w-5 h-5'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
								/>
							</svg>
						</button>
					</div>

					<div>
						<label htmlFor='SortBy' className='sr-only'>
							SortBy
						</label>

						<select
							id='SortBy'
							className='h-10 text-sm border-gray-300 rounded'
						>
							<option>Sort By</option>
							<option value='Title, DESC'>Title, DESC</option>
							<option value='Title, ASC'>Title, ASC</option>
							<option value='Price, DESC'>Price, DESC</option>
							<option value='Price, ASC'>Price, ASC</option>
						</select>
					</div>
				</div>

				<ul
					className={`${
						cardDisplayWay === 'grid' &&
						'grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4'
					} ${cardDisplayWay === 'column' && ''}`}
				>
					{productsData?.products.map((product) => (
						<ProductCard
							cardDisplayWay={cardDisplayWay}
							key={product._id}
							product={product}
						/>
					))}
				</ul>
			</div>
		</section>
	);
};

export default CategoryProducts;
