import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import SpinnerMain from '../../components/SpinnerMain/SpinnerMain';

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [productsCount, setProductsCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [perPageView, setPerPageView] = useState(12);
	const [isLoading, setIsLoading] = useState(true);
	const [reloadLoading,setReloadLoading] = useState(false)
	const pageCount = Math.ceil(productsCount / perPageView) || 0;
	const paginationAction = {
		currentPage,
		setCurrentPage,
		perPageView,
		setPerPageView,
		pageCount,
	};

	useEffect(() => {
		setReloadLoading(true)
		fetch(
			`${process.env.REACT_APP_API_URL}/products?perPageView=${perPageView}&currentPage=${currentPage}`
		)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.products);
				setProductsCount(data.productsCount);
				setIsLoading(false);
				setReloadLoading(false)
			});
	}, [currentPage, perPageView]);
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<div class='max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8'>
				<header>
					<h2 class='text-xl font-bold text-gray-900 sm:text-3xl'>
						Product Collection
					</h2>

					<p class='max-w-md mt-4 text-gray-500'>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Itaque praesentium cumque iure dicta incidunt est
						ipsam, officia dolor fugit natus?
					</p>
				</header>

				<div class='block mt-8 lg:hidden'>
					<button class='flex items-center gap-2 pb-1 text-gray-900 transition border-b border-gray-400 cursor-pointer hover:border-gray-600'>
						<span class='text-sm font-medium'>
							{' '}
							Filters & Sorting{' '}
						</span>

						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							stroke-width='1.5'
							stroke='currentColor'
							class='w-4 h-4'
						>
							<path
								stroke-linecap='round'
								stroke-linejoin='round'
								d='M8.25 4.5l7.5 7.5-7.5 7.5'
							/>
						</svg>
					</button>
				</div>

				<div class='mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8'>
					<div class='hidden space-y-4 lg:block'>
						<div>
							<label
								for='SortBy'
								class='block text-xs font-medium text-gray-700'
							>
								Sort By
							</label>

							<select
								id='SortBy'
								class='mt-1 text-sm border-gray-300 rounded'
							>
								<option>Sort By</option>
								<option value='Title, DESC'>Title, DESC</option>
								<option value='Title, ASC'>Title, ASC</option>
								<option value='Price, DESC'>Price, DESC</option>
								<option value='Price, ASC'>Price, ASC</option>
							</select>
						</div>

						<div>
							<p class='block text-xs font-medium text-gray-700'>
								Filters
							</p>

							<div class='mt-1 space-y-2'>
								<details class='overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden'>
									<summary class='flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer'>
										<span class='text-sm font-medium'>
											{' '}
											Availability{' '}
										</span>

										<span class='transition group-open:-rotate-180'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='w-4 h-4'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='M19.5 8.25l-7.5 7.5-7.5-7.5'
												/>
											</svg>
										</span>
									</summary>

									<div class='bg-white border-t border-gray-200'>
										<header class='flex items-center justify-between p-4'>
											<span class='text-sm text-gray-700'>
												{' '}
												0 Selected{' '}
											</span>

											<button
												type='button'
												class='text-sm text-gray-900 underline underline-offset-4'
											>
												Reset
											</button>
										</header>

										<ul class='p-4 space-y-1 border-t border-gray-200'>
											<li>
												<label
													for='FilterInStock'
													class='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterInStock'
														class='w-5 h-5 border-gray-300 rounded'
													/>

													<span class='text-sm font-medium text-gray-700'>
														In Stock (5+)
													</span>
												</label>
											</li>

											<li>
												<label
													for='FilterPreOrder'
													class='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterPreOrder'
														class='w-5 h-5 border-gray-300 rounded'
													/>

													<span class='text-sm font-medium text-gray-700'>
														Pre Order (3+)
													</span>
												</label>
											</li>

											<li>
												<label
													for='FilterOutOfStock'
													class='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterOutOfStock'
														class='w-5 h-5 border-gray-300 rounded'
													/>

													<span class='text-sm font-medium text-gray-700'>
														Out of Stock (10+)
													</span>
												</label>
											</li>
										</ul>
									</div>
								</details>

								<details class='overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden'>
									<summary class='flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer'>
										<span class='text-sm font-medium'>
											{' '}
											Price{' '}
										</span>

										<span class='transition group-open:-rotate-180'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='w-4 h-4'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='M19.5 8.25l-7.5 7.5-7.5-7.5'
												/>
											</svg>
										</span>
									</summary>

									<div class='bg-white border-t border-gray-200'>
										<header class='flex items-center justify-between p-4'>
											<span class='text-sm text-gray-700'>
												The highest price is $600
											</span>

											<button
												type='button'
												class='text-sm text-gray-900 underline underline-offset-4'
											>
												Reset
											</button>
										</header>

										<div class='p-4 border-t border-gray-200'>
											<div class='flex justify-between gap-4'>
												<label
													for='FilterPriceFrom'
													class='flex items-center gap-2'
												>
													<span class='text-sm text-gray-600'>
														$
													</span>

													<input
														type='number'
														id='FilterPriceFrom'
														placeholder='From'
														class='w-full border-gray-200 rounded-md shadow-sm sm:text-sm'
													/>
												</label>

												<label
													for='FilterPriceTo'
													class='flex items-center gap-2'
												>
													<span class='text-sm text-gray-600'>
														$
													</span>

													<input
														type='number'
														id='FilterPriceTo'
														placeholder='To'
														class='w-full border-gray-200 rounded-md shadow-sm sm:text-sm'
													/>
												</label>
											</div>
										</div>
									</div>
								</details>

								<details class='overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden'>
									<summary class='flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer'>
										<span class='text-sm font-medium'>
											{' '}
											Colors{' '}
										</span>

										<span class='transition group-open:-rotate-180'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												stroke-width='1.5'
												stroke='currentColor'
												class='w-4 h-4'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													d='M19.5 8.25l-7.5 7.5-7.5-7.5'
												/>
											</svg>
										</span>
									</summary>

									<div class='bg-white border-t border-gray-200'>
										<header class='flex items-center justify-between p-4'>
											<span class='text-sm text-gray-700'>
												{' '}
												0 Selected{' '}
											</span>

											<button
												type='button'
												class='text-sm text-gray-900 underline underline-offset-4'
											>
												Reset
											</button>
										</header>

										<ul class='p-4 space-y-1 border-t border-gray-200'>
											<li>
												<label
													for='FilterRed'
													class='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterRed'
														class='w-5 h-5 border-gray-300 rounded'
													/>

													<span class='text-sm font-medium text-gray-700'>
														Red
													</span>
												</label>
											</li>

											<li>
												<label
													for='FilterBlue'
													class='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterBlue'
														class='w-5 h-5 border-gray-300 rounded'
													/>

													<span class='text-sm font-medium text-gray-700'>
														Blue
													</span>
												</label>
											</li>

											<li>
												<label
													for='FilterGreen'
													class='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterGreen'
														class='w-5 h-5 border-gray-300 rounded'
													/>

													<span class='text-sm font-medium text-gray-700'>
														Green
													</span>
												</label>
											</li>

											<li>
												<label
													for='FilterOrange'
													class='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterOrange'
														class='w-5 h-5 border-gray-300 rounded'
													/>

													<span class='text-sm font-medium text-gray-700'>
														Orange
													</span>
												</label>
											</li>

											<li>
												<label
													for='FilterPurple'
													class='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterPurple'
														class='w-5 h-5 border-gray-300 rounded'
													/>

													<span class='text-sm font-medium text-gray-700'>
														Purple
													</span>
												</label>
											</li>

											<li>
												<label
													for='FilterTeal'
													class='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterTeal'
														class='w-5 h-5 border-gray-300 rounded'
													/>

													<span class='text-sm font-medium text-gray-700'>
														Teal
													</span>
												</label>
											</li>
										</ul>
									</div>
								</details>
							</div>
						</div>
					</div>

					<div class='lg:col-span-3'>
						{!reloadLoading && (
							<ul class='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
								{products.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
									/>
								))}
							</ul>
						)}
						{reloadLoading && <div className='flex justify-center items-center h-[700px]'>
						<ThreeDots/>
						</div>}
						<div className='mt-10 col-span-3'>
							<Pagination paginationAction={paginationAction} />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Shop;
