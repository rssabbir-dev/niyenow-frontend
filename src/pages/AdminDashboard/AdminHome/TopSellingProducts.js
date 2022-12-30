import React from 'react';
import { Link } from 'react-router-dom';

const TopSellingProducts = ({products,title}) => {
    return (
		<div className='space-y-2'>
			<p className='uppercase font-semibold'>
                {title} - <Link to='/admin/products' className='text-blue-500 hover:underline'>see all</Link>
			</p>
			{products?.map((product) => (
				<div
					key={product._id}
					className='flex gap-5 items-center border p-2 w-full rounded-md'
				>
					<img
						className='h-10 w-10 object-cover border-2 rounded-md'
						src={product.product_info.product_image}
						alt=''
					/>
					<div>
						<p className='font-semibold'>
							{product.product_info.product_name.slice(0, 40)}...
						</p>
						<div className='text-sm'>
							<p>
								Total Sold: {product.product_info.totalSale}{' '}
								Pice
							</p>
							<p>
								Left Stock:{' '}
								{product.product_info.product_quantity} Pice
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default TopSellingProducts;