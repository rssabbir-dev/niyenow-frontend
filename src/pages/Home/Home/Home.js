import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import FeaturedProducts from '../../../components/FeaturedProducts/FeaturedProducts';
import Products from '../../../components/Products/Products';
import SpinnerMain from '../../../components/SpinnerMain/SpinnerMain';
import HomeBanner from '../HomeBanner/HomeBanner';

const Home = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ['homeProducts'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/products`)
            const data = await res.json()
            return data
        }
    })
    if (isLoading) {
        return <SpinnerMain/>
    }
    return (
		<div>
			<HomeBanner />
			<FeaturedProducts />
			<Products products={products} />
		</div>
	);
};

export default Home;