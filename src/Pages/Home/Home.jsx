import React from 'react';
import Banner from './Banner/Banner';

import Review from '../Review/Review';
import Promotion from '../Promotion/Promotion';
import { Element } from 'react-scroll';

const Home = () => {
    return (
        <div>
            <div className='bg-[#0D0D2B] '>
                <Banner></Banner>


            </div>
            {/* <Products></Products> */}
            <Element name="featured-section">
                <Promotion />
            </Element>

            <Element name="review-section">
                <Review />
            </Element>

        </div>
    );
};

export default Home;