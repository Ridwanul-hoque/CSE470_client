import React from 'react';
import Banner from './Banner/Banner';

import Review from '../Review/Review';

const Home = () => {
    return (
        <div>
            <div className='bg-[#0D0D2B] '>
                <Banner></Banner>


            </div>
            {/* <Products></Products> */}

            <Review></Review>
            
        </div>
    );
};

export default Home;