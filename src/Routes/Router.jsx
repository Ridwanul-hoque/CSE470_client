import {
    createBrowserRouter,
} from "react-router-dom";

import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Shop from "../Pages/Shop/Shop";
import Feature from "../Pages/Feature/Feature";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UserProfile from "../Pages/Dashboard/UserProfile/UserProfile";
import Sellitem from "../Pages/Dashboard/SellItem/Sellitem";
import Cart from "../Pages/Cart/Cart"

import PrivateRoutes from "./PrivateRoutes";
import BusinessProfile from "../Pages/Dashboard/BusinessProfile.jsx/BusinessProfile";
import AdminRoutes from "./AdminRoutes";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import Approval from "../Pages/Dashboard/Approval/Approval";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import AddReview from "../Pages/Dashboard/addReview/addReview";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/featured',
                element: <Feature></Feature>
            }, 
            {
                path: '/cart',
                element: <Cart></Cart>
            },
            {
                path: '/shop', // ✅ Changed to lowercase for consistency
                element: <Shop></Shop>
                // ✅ OR use this if you want to protect the page:
                // element: <PrivateRoutes><Shop /></PrivateRoutes>
            },
            {
                path: '/contact',
                element: <ContactUs></ContactUs>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
        children: [
            {
                path: 'profile',
                element: <PrivateRoutes><UserProfile /></PrivateRoutes>
            },
            {
                path: 'sellItems',
                element: <PrivateRoutes><Sellitem /></PrivateRoutes>
            },
            {
                path: 'business',
                element: <PrivateRoutes><BusinessProfile /></PrivateRoutes>
            },
            {
                path: 'business',
                element: <PrivateRoutes><BusinessProfile /></PrivateRoutes>
            },
            {
                path: 'business',
                element: <PrivateRoutes><BusinessProfile /></PrivateRoutes>
            },
            {
                path: 'addReview',
                element: <PrivateRoutes><AddReview/></PrivateRoutes>
            },
            {
                path: 'adminDashboard',
                element: <AdminRoutes><AdminDashboard /></AdminRoutes>
            },
            {
                path: 'manageUsers',
                element: <AdminRoutes><ManageUser /></AdminRoutes>
            },
            {
                path: 'approval',
                element: <AdminRoutes><Approval /></AdminRoutes>
            }
            
            
        ]
    }
]);
