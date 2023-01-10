import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';

const FeaturedProducts = ({ products,title,toSlug }) => {
	return (
		<section>
			<div className='max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8'>
				<header>
					<h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>
						{title}
					</h2>

					<p className='max-w-md mt-4 text-gray-500'>
						Here is our brand new product, choose for you and your
						family.
					</p>
				</header>

				<div className='mt-8'>
					<div className='text-sm text-right text-gray-500'>
						<Link to={toSlug} className=' link link-hover underline'>
							See All
						</Link>
					</div>
				</div>

				<ul className='grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4'>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</ul>
			</div>
		</section>
	);
};

export default FeaturedProducts;