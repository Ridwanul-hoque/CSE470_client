import React from 'react';

const Footer = () => {
    return (
        <div className="container mx-auto px-6 text-center md:text-left">
            {/* Top Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1: About */}
                <div>
                    <h1 className="text-xl font-bold text-gray-700">About</h1>
                    <p className="mt-2 text-sm text-gray-600">Your one-stop shop for unique and second hand products.</p>
                </div> 
                {/* Column 2: Contact */}
                <div>
                    <h2 className="text-lg font-bold">Quick Links</h2>
                    <ul className="mt-2 space-y-2">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/featured" className="hover:underline">Featured Products</a></li>
                        <li><a href="/new-products" className="hover:underline">New Products</a></li>
                        <li><a href="/customer-service" className="hover:underline">Customer Service</a></li>
                        <li><a href="/login" className="hover:underline">Login</a></li>
                    </ul>
                </div>
                {/* Column 3: Contact */}
                <div>
                    <h2 className="text-lg font-bold">Contact Us</h2>
                    <p className="text-gray-400 mt-2">Email: support@yourstore.com</p>
                    <p className="text-gray-400">Phone: +123 456 7890</p>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-600 mt-6 pt-4 text-sm text-gray-400">
                &copy; {new Date().getFullYear()} My Store. All rights reserved.
            </div>
            
        </div>
    );
};

export default Footer;