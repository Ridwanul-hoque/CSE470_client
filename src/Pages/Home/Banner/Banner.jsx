import React from "react";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi";
import img from "../../../assets/Banner.jpg";
import img2 from "../../../assets/Banner2.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="relative text-white min-h-[80vh] flex items-center px-8 overflow-hidden max-w-screen-xl mx-auto">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/path-to-grid-pattern.png')] opacity-30"></div>

            {/* Left Section */}
            <div className="w-1/2 flex flex-col justify-center text-left z-10">
                <h1 className="text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#FFA07A]">
                    Explore, Buy & Sell Products
                </h1>
                <p className="text-lg text-gray-300 mb-6">
                    A secure marketplace for new, second-hand, and business products. Connect with buyers & sellers seamlessly.
                </p>
                <Link to="/shop">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-[#FF6B6B] text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2 hover:bg-[#FFA07A]"
                    >
                        <FiShoppingCart className="text-xl" /> Get Started
                    </motion.button>
                </Link>
                
            </div>

            {/* Right Section with Floating Elements */}
            <div className="w-1/2 flex justify-center relative z-10 mt-[-40px]">
                {/* Main Image */}
                <motion.div
                    className="relative w-full max-w-[380px] h-[280px]"
                    animate={{ y: [-5, 5, -5] }} // Floating effect for main image
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img src={img} alt="Marketplace Graphic" className="w-full h-full object-cover rounded-xl shadow-lg" />

                    {/* Second Image positioned at bottom-right with left-to-right motion */}
                    <motion.div
                        className="absolute bottom-[-100px] right-[-30px] w-[280px] h-[180px]"
                        animate={{ x: [-15, 10, -10] }} // Left-to-right motion
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <img src={img2} alt="Floating Image" className="w-full h-full object-cover rounded-lg shadow-md" />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Banner;
