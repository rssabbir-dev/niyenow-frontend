import React from 'react';
import FeaturedProducts from '../../../components/FeaturedProducts/FeaturedProducts';
import Products from '../../../components/Products/Products';
import HomeBanner from '../HomeBanner/HomeBanner';

const Home = () => {
    return (
        <div>
            <HomeBanner />
            <FeaturedProducts/>
            <Products/>
        </div>
    );
};

export default Home;