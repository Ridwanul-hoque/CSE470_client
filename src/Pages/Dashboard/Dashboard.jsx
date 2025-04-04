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


const Dashboard = () => {
    // const [isAdmin] = useAdmin();/


    return (
        <div className='flex'>
            {/* Sidebar */}
            <div className='w-64 min-h-screen bg-[#0D0D2B] text-[#FE5F75]'>
                <ul className="menu">
                    <li>
                        <NavLink to="/dashboard/profile">
                            <FaHome /> User Profile
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/sellItems">
                            <FaUser /> Sell Items
                        </NavLink>
                    </li>

                    
                    {/* {
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
                                    <NavLink to="/dashboard/approveStatus">
                                    <CiSquareQuestion /> Approved Contact Request
                                    </NavLink>
                                </li>

                            </>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/dashboard/user">
                                        <IoIosContact />Profile
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/addData">
                                        <FaAdjust></FaAdjust>Add Biodata
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/viewData">
                                        <MdOutlineViewInAr />View Biodata
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/contact">
                                        <GrContactInfo /> My Contact Request
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/favourite">
                                        Favourites Biodata
                                    </NavLink>
                                </li>
                            </>
                        )
                    } */}
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
