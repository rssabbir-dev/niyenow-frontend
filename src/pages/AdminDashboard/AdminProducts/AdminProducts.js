import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
	const { user } = useSelector((state) => state.auth);
	const { data: products, isLoading } = useQuery({
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
    console.log(products);
    if (isLoading) {
        return <p className='text-8xl'>Loading...</p>
    }
	return (
		<section>
			<Link to='/admin/products/new-product'>New Product</Link>
            <div>
                {
                    products.map(pd => <p key={pd._id}>{pd.product_info.product_name}</p>)
                }
            </div>
		</section>
	);
};

export default AdminProducts;
