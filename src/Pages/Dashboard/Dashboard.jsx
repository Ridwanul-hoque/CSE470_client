import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { VscPreview } from "react-icons/vsc";
import { FaHome, FaUser, FaStore, FaShoppingCart, FaHistory, FaCheckCircle } from 'react-icons/fa';
import { IoIosContact } from "react-icons/io";
import { MdOutlineViewInAr, MdReport, MdRateReview } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { CiSquareQuestion } from "react-icons/ci";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { TbPackages } from "react-icons/tb";
import useAdmin from '../../Hooks/useAdmin';

const Dashboard = () => {
    const [isAdmin] = useAdmin();

    const activeClass = 'flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#FE5F75] to-[#FC9842] text-white rounded-md font-semibold shadow-lg';
    const defaultClass = 'flex items-center gap-2 px-4 py-3 hover:bg-[#1E1E3F] hover:text-white transition-all rounded-md font-medium';

    return (
        <div className='flex min-h-screen bg-[#F4F4F8]'>
            {/* Sidebar */}
            <div className='w-64 bg-[#0D0D2B] text-[#FE5F75] px-4 py-6 shadow-2xl flex flex-col justify-between'>
                <div>
                    <h2 className='text-2xl text-white font-bold mb-6 text-center'>Dashboard</h2>
                    <ul className="space-y-2">
                        {isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminDashboard" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <FaHome /> Admin Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageUsers" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <FaUser /> Manage Users
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/approval" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <BsClipboard2CheckFill /> Business Approval
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/adminReport" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <MdReport /> Manage Reports
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <IoIosContact /> Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/sellItems" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <FaStore /> Sell Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/business" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <MdOutlineViewInAr /> Business Center
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addReview" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <MdRateReview /> Add Review
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/userItems" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <FaShoppingCart /> Your Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/report" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <MdReport /> Report Issue
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/userReports" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <GrContactInfo /> Your Reports
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/order-history" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <TbPackages /> Track Your Order
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/orderTrack" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                        <VscPreview /> Business History
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                    <div className="mt-6 border-t border-[#FE5F75] pt-4">
                        <li>
                            <NavLink to="/" className={({ isActive }) => isActive ? activeClass : defaultClass}>
                                <FaHome /> Home
                            </NavLink>
                        </li>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex-1 bg-white p-8 overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
