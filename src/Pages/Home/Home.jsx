import React from 'react';
import Banner from './Banner/Banner';
import Products from './Banner/products';
import Review from '../Review/Review';

const Home = () => {
    return (
        <div className='bg-[#0D0D2B]'>
            <Banner></Banner>
            <Products></Products>
            <Review></Review>
        </div>
    );
};

export default Home;