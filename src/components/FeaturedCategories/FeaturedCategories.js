import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCategories = ({categories}) => {
	return (
		<section>
			<div className='max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8'>
				<header className='text-center'>
					<h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>
						Featured Category
					</h2>

					<p className='max-w-md mx-auto mt-4 text-gray-500'>
						Here are our top best selling category, every day we
						make us our customer happy.
					</p>
				</header>

				<ul className='grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3'>
					{categories?.map((category, index) => (
						<li
							key={category._id}
							className={`${
								index === 2 &&
								'lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1'
							}`}
						>
							<Link
								to={`/category/${category.slug}`}
								className='relative block group'
							>
								<img
									src={category.image}
									alt=''
									className='object-cover w-full transition duration-500 aspect-square group-hover:opacity-90'
								/>
								<div className='absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-t sm:from-gray-700/50 sm:to-white/25'></div>
								<div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
									<h3 className='text-xl font-medium text-white'>
										{category.name}
									</h3>

									<span className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>
										Shop Now
									</span>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default FeaturedCategories;
