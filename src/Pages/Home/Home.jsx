import React from 'react';
import Banner from './Banner/Banner';
import Products from './Banner/products';

const Home = () => {
    return (
        <div className='bg-[#0D0D2B]'>
            <Banner></Banner>
            <Products></Products>
        </div>
    );
};

export default Home;