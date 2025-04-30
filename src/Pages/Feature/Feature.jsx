import React from 'react';
import Vendor from './product/vendor';
import UserProducts from './product/usersp';

const Feature = () => {
    return (
        <div className='bg-[#0D0D2B]'>
           <Vendor></Vendor>
           <UserProducts></UserProducts>
        </div>
    );
};

export default Feature;