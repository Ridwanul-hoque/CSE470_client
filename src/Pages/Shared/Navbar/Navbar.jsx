import React from 'react';

const Navbar = () => {
    return (
        <div>
           <a href="/" className="hover:underline">Home</a> 
           <a href="/featured" className="hover:underline">Featured Products</a>
           <a href="/new-products" className="hover:underline">New Products</a>
           <a href="/contact" className="hover:underline">Contact Us</a>
           <a href="/login" className="hover:underline">Login</a>
        </div>
    );
};

export default Navbar;