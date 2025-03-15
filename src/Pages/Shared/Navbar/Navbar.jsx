import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const nav = (
        <>
            <li><Link to="/" className='text-[#FE5F75]'>Home</Link></li>
            <li><Link to="/featured" className='text-[#FE5F75]'>Featured Items</Link></li>
            <li><Link to="/Shop" className='text-[#FE5F75]'>Shop</Link></li>
            <li><Link to="/ContactUs" className='text-[#FE5F75]'>Contact</Link></li>
            {/* <li><Link to="/" className='text-[#FE5F75]'>New Products</Link></li> */}
        </>
    );

    return (
        <div className="navbar shadow-sm max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl text-[#FE5F75]">SwiftMart</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {nav}
                </ul>
            </div>
            <div className="navbar-end">
                <li><Link to="login" className='btn bg-[#FE5F75] border-0'>Login</Link></li>
                <li><Link to="signup" className='btn bg-[#FE5F75] border-0'>SignUp</Link></li>
            </div>
        </div>
    );
};

export default Navbar;
