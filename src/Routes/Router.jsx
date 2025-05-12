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
import Cart from "../Pages/Cart/Cart";
import Wishlist from '../Pages/wishlist/wl';

import PrivateRoutes from "./PrivateRoutes";
import BusinessProfile from "../Pages/Dashboard/BusinessProfile.jsx/BusinessProfile";
import AdminRoutes from "./AdminRoutes";
import AdminDashboard from "../Pages/Dashboard/AdminDashboard/AdminDashboard";
import Approval from "../Pages/Dashboard/Approval/Approval";
import ManageUser from "../Pages/Dashboard/ManageUser/ManageUser";
import AddReview from "../Pages/Dashboard/addReview/addReview";
import Track from "../Pages/Dashboard/orderTrack/track";
import UserItems from "../Pages/Dashboard/userItems/userItems";
import Report from "../Pages/Dashboard/Report/Report";
import AdminReport from "../Pages/Dashboard/AdminReport/AdminReport";
import ResolvedReport from "../Pages/Dashboard/resolvedReport/resolvedReport";
import Payment from "../Pages/Payment/Payment";
// import OrderSummary from "../Pages/Payment/OrderSummary";
import OrderHistory from "../Pages/Dashboard/OrderHistory/OrderHistory";


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
                element: <PrivateRoutes><Cart></Cart></PrivateRoutes>
            },
            {
                path: '/shop', // ✅ Changed to lowercase for consistency
                element: <PrivateRoutes><Shop></Shop></PrivateRoutes>
                // ✅ OR use this if you want to protect the page:
                // element: <PrivateRoutes><Shop /></PrivateRoutes>
            },
            {
                path: '/payment',
                element: <PrivateRoutes><Payment></Payment></PrivateRoutes>
            },
            
            {
                path: '/contact',
                element: <PrivateRoutes><ContactUs></ContactUs></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/wishlist', // Added Wishlist route
                element: <Wishlist></Wishlist>
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
                path: 'addReview',
                element: <PrivateRoutes><AddReview /></PrivateRoutes>
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
                path: 'report',
                element: <PrivateRoutes><Report /></PrivateRoutes>
            },
            {
                path:'order-history',
                element: <PrivateRoutes><OrderHistory></OrderHistory></PrivateRoutes>
            },
            {
                path: 'userItems',
                element: <PrivateRoutes><UserItems></UserItems></PrivateRoutes>
            },
            {
                path: 'userReports',
                element: <PrivateRoutes><ResolvedReport></ResolvedReport></PrivateRoutes>
            },
            {

                path: 'orderTrack', // Added Track route
                element: <PrivateRoutes><Track /></PrivateRoutes>
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
            },
            {
                path: 'adminReport',
                element: <AdminRoutes><AdminReport /></AdminRoutes>

            }


        ]
    }
]);
