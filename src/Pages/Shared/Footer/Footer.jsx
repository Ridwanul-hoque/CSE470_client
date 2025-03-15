import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-[#FE5F75] py-10 max-w-screen-xl mx-auto">
      <div className="container px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* About Column */}
          <div>
            <h2 className="text-xl font-bold">About SwiftMart</h2>
            <p className="mt-3 text-sm">
              Your one-stop marketplace for both used and new products. Sell or buy with ease!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold">Quick Links</h2>
            <ul className="mt-3 space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/featured" className="hover:underline">Featured Products</a></li>
              <li><a href="/new-products" className="hover:underline">New Arrivals</a></li>
              <li><a href="/customer-service" className="hover:underline">Customer Support</a></li>
              <li><a href="/sell" className="hover:underline">Sell with Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p className="mt-3 text-sm">Email: support@swiftmart.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <a href="#" className="hover:text-white"><FaFacebookF /></a>
              <a href="#" className="hover:text-white"><FaTwitter /></a>
              <a href="#" className="hover:text-white"><FaInstagram /></a>
              <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h2 className="text-lg font-bold">Stay Updated</h2>
            <p className="mt-3 text-sm">Subscribe to our newsletter for latest offers and updates.</p>
            <div className="mt-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full p-2 rounded-md text-white"
              />
              <button className="mt-2 w-full bg-[#FE5F75] text-white p-2 rounded-md hover:bg-white hover:text-[#161634]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#FE5F75] mt-6 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} SwiftMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
