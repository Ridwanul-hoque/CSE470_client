import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Providers/AuthProviders';
import useAdmin from '../../../Hooks/useAdmin';
import icon from '../../../../src/assets/icon2.png'
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [isAdmin] = useAdmin();

    const handlelogout = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const nav = (
        <>
            <li><Link to="/" className='text-[#FE5F75]'>Home</Link></li>
            <li>
                <ScrollLink
                    to="featured-section"
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="cursor-pointer text-[#FE5F75]"
                >
                    Featured
                </ScrollLink>
            </li>
            
            <li><Link to="/Shop" className='text-[#FE5F75]'>Shop</Link></li>
            <li><Link to="/contact" className='text-[#FE5F75]'>Contact</Link></li>
            <li>
                <ScrollLink
                    to="review-section"
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="cursor-pointer text-[#FE5F75]"
                >
                    Review
                </ScrollLink>
            </li>
            {/* <li>
                <Link
                    to={isAdmin ? '/dashboard/adminDashboard' : '/dashboard/profile'}
                    className="block px-4 py-2 text-[#FE5F75] transition"
                >
                    Dashboard
                </Link>
            </li> */}
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
                <img src={icon} alt="" />
                <a className="btn btn-ghost text-xl text-[#FE5F75]">SwiftMart</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {nav}
                </ul>
            </div>
            {
                user ? (
                    <div className="navbar-end dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn bg-white/30 backdrop-blur-lg border border-white/20 text-[#FE5F75] hover:bg-white/40 flex items-center gap-2 rounded-full px-4"
                        >
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="w-8 h-8 rounded-full border-2 border-[#FE5F75]"
                            />
                            <span className="hidden md:inline font-medium">{user.displayName}</span>
                            <svg
                                className="w-4 h-4 ml-1 text-[#FE5F75]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="mt-3 z-[1] p-4 shadow-lg menu menu-sm dropdown-content bg-white/30 backdrop-blur-lg rounded-box w-56"
                        >
                            <li className="text-center font-semibold text-[#FE5F75] mb-2">
                                {user.displayName}
                            </li>
                            <li>
                                <Link
                                    to={isAdmin ? '/dashboard/adminDashboard' : '/dashboard/profile'}
                                    className="text-[#FE5F75] hover:bg-[#FE5F75]/10"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handlelogout}
                                    className="text-[#FE5F75] hover:bg-[#FE5F75]/10"
                                >
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <div className="navbar-end space-x-2">
                        <Link to="/login" className="btn bg-[#FE5F75] border-0">Login</Link>
                        <Link to="/signup" className="btn bg-[#FE5F75] border-0">SignUp</Link>
                    </div>
                )
            }


        </div>
    );
};

export default Navbar;
