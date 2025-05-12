import React from 'react';
// import { FaBookAtlas, FaPeopleGroup, FaUtensils, FaList, FaHome, FaMoneyBill, FaUser } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import { VscPreview } from "react-icons/vsc";
// import useAdmin from '../../Hooks/useAdmin';/
import { FaAdjust, FaHome, FaUser } from 'react-icons/fa';
import { IoIosContact } from "react-icons/io"
import { MdOutlineViewInAr } from "react-icons/md";
import { GrContactInfo } from "react-icons/gr";
import { CiSquareQuestion } from "react-icons/ci";
import useAdmin from '../../Hooks/useAdmin';


const Dashboard = () => {
    const [isAdmin] = useAdmin();


    return (
        <div className='flex'>
            {/* Sidebar */}
            <div className='w-64 min-h-screen bg-[#0D0D2B] text-[#FE5F75]'>
                <ul className="menu">
                    {/* <li>
                        <NavLink to="/dashboard/profile">
                            <FaHome /> User Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/sellItems">
                            <FaUser /> Sell Items
                        </NavLink>
                    </li> */}


                    {
                        isAdmin ? (
                            <>
                                <li>
                                    <NavLink to="/dashboard/adminDashboard">
                                        <FaHome /> Admin Dashboard
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/manageUsers">
                                        <FaUser /> Manage Users
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/dashboard/approval">
                                        <CiSquareQuestion /> Business Approval
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/adminReport">
                                        <CiSquareQuestion /> Manage Reports
                                    </NavLink>
                                </li>
                                
                                {/* <li>
                                    <NavLink to="/dashboard/approval">
                                        Business Approval
                                    </NavLink>
                                </li> */}

                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/profile">
                                        <IoIosContact />Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/sellItems">
                                        <FaAdjust></FaAdjust>Sell Items
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/business">
                                        <MdOutlineViewInAr />Business Center
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addReview">
                                        <CiSquareQuestion /> Add Review 
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/userItems">
                                        <CiSquareQuestion /> Your Items 
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/report">
                                        <CiSquareQuestion /> Report Issue 
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/userReports">
                                        <CiSquareQuestion /> Your Reports
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/order-history">
                                        <CiSquareQuestion /> Your Order Items
                                    </NavLink>
                                </li>
                                {/* {/* <li>
                                    <NavLink to="/dashboard/approval">
                                        <GrContactInfo /> Approval
                                    </NavLink>
                                </li> */}
                                <li>
                                    <NavLink to="/dashboard/orderTrack">
                                        <VscPreview /> Order Tracker
                                    </NavLink>
                                </li>
                            
                            </>
                        )
                    }
                    <div className="divider"></div>
                    <li>

                        <NavLink to="/"> <FaHome></FaHome> Home</NavLink>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className='flex-1 p-8'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
