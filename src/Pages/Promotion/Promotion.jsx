import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Promotion = () => {
    const [promotedProducts, setPromotedProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/promote')
            .then(res => setPromotedProducts(res.data))
            .catch(err => console.error('Error fetching promoted products:', err));
    }, []);

    return (
        <div className="p-6 max-w-screen-xl mx-auto bg-gradient-to-b min-h-screen text-white my-12">
            <h2 className="text-4xl font-extrabold text-[#FE5F75] mb-10 text-center drop-shadow-lg tracking-wide">
                ---- Featured Products ----
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {promotedProducts.map(product => (
                    <div
                        key={product._id}
                        className="rounded-2xl bg-[#0D0D2B] border border-[#FE5F75]/40 relative overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300"
                    >
                        <div className="relative group">
                            <img
                                src={product.image}
                                alt={product.productName}
                                className="w-full h-52 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                            />
                            
                        </div>
                        <div className="p-5 space-y-3">
                            <h3 className="text-2xl font-bold text-[#FE5F75] tracking-wide">{product.productName}</h3>
                            <p className="text-xs uppercase text-[#FE5F75]/70">{product.productType}</p>
                            <p className="text-sm text-gray-300">{product.description}</p>
                            <div className="flex justify-between items-center pt-2 border-t border-[#FE5F75]/20 mt-2">
                                <span className="text-xl font-extrabold text-green-400">${product.price}</span>
                                <span className="text-sm text-gray-400">Qty: {product.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link
                    to="/shop"
                    className="inline-block bg-gradient-to-br from-[#FE5F75] to-[#0D0D2B] hover:from-[#FF7A85] hover:to-[#1A1A40] text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 tracking-wider hover:scale-105"
                >
                    See More in Shop
                </Link>
            </div>
        </div>
    );
};

export default Promotion;
