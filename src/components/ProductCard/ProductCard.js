import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const {product_name,product_price,product_image} = product?.product_info;
    return (
		<li>
			<Link to={`/product/${product._id}`} className='block overflow-hidden group'>
				<img
					src={product.product_image}
					alt=''
					className='h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]'
				/>

				<div className='relative pt-3 bg-white'>
					<h3 className='text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4'>
                        { product_name}
					</h3>

					<p className='mt-2'>
						<span className='sr-only'> Regular Price </span>

						<span className='tracking-wider text-gray-900'>
							{' '}
							${product_price} USD{' '}
						</span>
					</p>
				</div>
			</Link>
		</li>
	);
};

export default ProductCard;