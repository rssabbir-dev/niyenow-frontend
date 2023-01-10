
import React, { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from '../../components/ProductCard/ProductCard';
import SpinnerMain from '../../components/SpinnerMain/SpinnerMain';
import SpinnerSecond from '../../components/SpinnerSecond/SpinnerSecond';

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [productsCount, setProductsCount] = useState(0);
	const [currentPage, setCurrentPage] = useState(0);
	const [perPageView, setPerPageView] = useState(12);
	const [isLoading, setIsLoading] = useState(true);
	const [reloadLoading, setReloadLoading] = useState(false);
	const pageCount = Math.ceil(productsCount / perPageView) || 0;
	const paginationAction = {
		currentPage,
		setCurrentPage,
		perPageView,
		setPerPageView,
		pageCount,
	};

	useEffect(() => {
		setReloadLoading(true);
		fetch(
			`${process.env.REACT_APP_API_URL}/products?perPageView=${perPageView}&currentPage=${currentPage}`
		)
			.then((res) => res.json())
			.then((data) => {
				setProducts(data.products);
				setProductsCount(data.productsCount);
				setIsLoading(false);
				setReloadLoading(false);
			});
	}, [currentPage, perPageView]);
	if (isLoading) {
		return <SpinnerMain />;
	}
	return (
		<section>
			<div className='max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8'>
				<header>
					<h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>
						Product Collection
					</h2>

					<p className='max-w-md mt-4 text-gray-500'>
						Lorem ipsum, dolor sit amet consectetur adipisicing
						elit. Itaque praesentium cumque iure dicta incidunt est
						ipsam, officia dolor fugit natus?
					</p>
				</header>

				<div className='block mt-8 lg:hidden'>
					<button className='flex items-center gap-2 pb-1 text-gray-900 transition border-b border-gray-400 cursor-pointer hover:border-gray-600'>
						<span className='text-sm font-medium'>
							{' '}
							Filters & Sorting{' '}
						</span>

						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-4 h-4'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M8.25 4.5l7.5 7.5-7.5 7.5'
							/>
						</svg>
					</button>
				</div>

				<div className='mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8'>
					<div className='hidden space-y-4 lg:block'>
						<div className=''>
							<label
								htmlFor='SortBy'
								className='block text-xs font-medium text-gray-700'
							>
								Sort By
							</label>

							<select
								id='SortBy'
								className='mt-1 text-sm border-gray-300 rounded'
							>
								<option>Sort By</option>
								<option value='Title, DESC'>Title, DESC</option>
								<option value='Title, ASC'>Title, ASC</option>
								<option value='Price, DESC'>Price, DESC</option>
								<option value='Price, ASC'>Price, ASC</option>
							</select>
						</div>

						<div>
							<p className='block text-xs font-medium text-gray-700'>
								Filters
							</p>

							<div className='mt-1 space-y-2'>
								<details className='overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden'>
									<summary className='flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer'>
										<span className='text-sm font-medium'>
											{' '}
											Availability{' '}
										</span>

										<span className='transition group-open:-rotate-180'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												className='w-4 h-4'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M19.5 8.25l-7.5 7.5-7.5-7.5'
												/>
											</svg>
										</span>
									</summary>

									<div className='bg-white border-t border-gray-200'>
										<header className='flex items-center justify-between p-4'>
											<span className='text-sm text-gray-700'>
												{' '}
												0 Selected{' '}
											</span>

											<button
												type='button'
												className='text-sm text-gray-900 underline underline-offset-4'
											>
												Reset
											</button>
										</header>

										<ul className='p-4 space-y-1 border-t border-gray-200'>
											<li>
												<label
													htmlFor='FilterInStock'
													className='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterInStock'
														className='w-5 h-5 border-gray-300 rounded'
													/>

													<span className='text-sm font-medium text-gray-700'>
														In Stock (5+)
													</span>
												</label>
											</li>

											<li>
												<label
													htmlFor='FilterPreOrder'
													className='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterPreOrder'
														className='w-5 h-5 border-gray-300 rounded'
													/>

													<span className='text-sm font-medium text-gray-700'>
														Pre Order (3+)
													</span>
												</label>
											</li>

											<li>
												<label
													htmlFor='FilterOutOfStock'
													className='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterOutOfStock'
														className='w-5 h-5 border-gray-300 rounded'
													/>

													<span className='text-sm font-medium text-gray-700'>
														Out of Stock (10+)
													</span>
												</label>
											</li>
										</ul>
									</div>
								</details>

								<details className='overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden'>
									<summary className='flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer'>
										<span className='text-sm font-medium'>
											{' '}
											Price{' '}
										</span>

										<span className='transition group-open:-rotate-180'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												className='w-4 h-4'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M19.5 8.25l-7.5 7.5-7.5-7.5'
												/>
											</svg>
										</span>
									</summary>

									<div className='bg-white border-t border-gray-200'>
										<header className='flex items-center justify-between p-4'>
											<span className='text-sm text-gray-700'>
												The highest price is $600
											</span>

											<button
												type='button'
												className='text-sm text-gray-900 underline underline-offset-4'
											>
												Reset
											</button>
										</header>

										<div className='p-4 border-t border-gray-200'>
											<div className='flex justify-between gap-4'>
												<label
													htmlFor='FilterPriceFrom'
													className='flex items-center gap-2'
												>
													<span className='text-sm text-gray-600'>
														$
													</span>

													<input
														type='number'
														id='FilterPriceFrom'
														placeholder='From'
														className='w-full border-gray-200 rounded-md shadow-sm sm:text-sm'
													/>
												</label>

												<label
													htmlFor='FilterPriceTo'
													className='flex items-center gap-2'
												>
													<span className='text-sm text-gray-600'>
														$
													</span>

													<input
														type='number'
														id='FilterPriceTo'
														placeholder='To'
														className='w-full border-gray-200 rounded-md shadow-sm sm:text-sm'
													/>
												</label>
											</div>
										</div>
									</div>
								</details>

								<details className='overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden'>
									<summary className='flex items-center justify-between gap-2 p-4 text-gray-900 transition cursor-pointer'>
										<span className='text-sm font-medium'>
											{' '}
											Colors{' '}
										</span>

										<span className='transition group-open:-rotate-180'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth='1.5'
												stroke='currentColor'
												className='w-4 h-4'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M19.5 8.25l-7.5 7.5-7.5-7.5'
												/>
											</svg>
										</span>
									</summary>

									<div className='bg-white border-t border-gray-200'>
										<header className='flex items-center justify-between p-4'>
											<span className='text-sm text-gray-700'>
												{' '}
												0 Selected{' '}
											</span>

											<button
												type='button'
												className='text-sm text-gray-900 underline underline-offset-4'
											>
												Reset
											</button>
										</header>

										<ul className='p-4 space-y-1 border-t border-gray-200'>
											<li>
												<label
													htmlFor='FilterRed'
													className='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterRed'
														className='w-5 h-5 border-gray-300 rounded'
													/>

													<span className='text-sm font-medium text-gray-700'>
														Red
													</span>
												</label>
											</li>

											<li>
												<label
													htmlFor='FilterBlue'
													className='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterBlue'
														className='w-5 h-5 border-gray-300 rounded'
													/>

													<span className='text-sm font-medium text-gray-700'>
														Blue
													</span>
												</label>
											</li>

											<li>
												<label
													htmlFor='FilterGreen'
													className='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterGreen'
														className='w-5 h-5 border-gray-300 rounded'
													/>

													<span className='text-sm font-medium text-gray-700'>
														Green
													</span>
												</label>
											</li>

											<li>
												<label
													htmlFor='FilterOrange'
													className='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterOrange'
														className='w-5 h-5 border-gray-300 rounded'
													/>

													<span className='text-sm font-medium text-gray-700'>
														Orange
													</span>
												</label>
											</li>

											<li>
												<label
													htmlFor='FilterPurple'
													className='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterPurple'
														className='w-5 h-5 border-gray-300 rounded'
													/>

													<span className='text-sm font-medium text-gray-700'>
														Purple
													</span>
												</label>
											</li>

											<li>
												<label
													htmlFor='FilterTeal'
													className='inline-flex items-center gap-2'
												>
													<input
														type='checkbox'
														id='FilterTeal'
														className='w-5 h-5 border-gray-300 rounded'
													/>

													<span className='text-sm font-medium text-gray-700'>
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

					<div className='lg:col-span-3'>
						{!reloadLoading && (
							<ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
								{products.map((product) => (
									<ProductCard
										key={product._id}
										product={product}
									/>
								))}
							</ul>
						)}
						{reloadLoading && (
							<div className='flex justify-center items-center h-[700px]'>
								<SpinnerSecond/>
							</div>
						)}
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
