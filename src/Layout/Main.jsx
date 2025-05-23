import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div>
            <div className='bg-[#161634]'>
                <Navbar />
            </div>
            <Outlet />
            <div className='bg-[#161634]'>
                <Footer />
            </div>
        </div>
    );
};

export default Main;
