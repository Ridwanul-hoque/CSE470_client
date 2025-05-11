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
        <div className="p-6 max-w-screen-xl mx-auto">
            <h2 className="text-3xl font-bold text-[#FE5F75] mb-6 text-center">🔥 Featured Products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {promotedProducts.map(product => (
                    <div
                        key={product._id}
                        className="rounded-2xl shadow-lg overflow-hidden bg-white/30 backdrop-blur-md border border-white/20 hover:shadow-xl transition-all duration-300"
                    >
                        <img
                            src={product.image}
                            alt={product.productName}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5 space-y-2">
                            <h3 className="text-xl font-semibold text-[#FE5F75]">{product.productName}</h3>
                            <p className="text-sm text-gray-500 uppercase">{product.productType}</p>
                            <p className="text-gray-700 text-sm">{product.description}</p>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-lg text-green-600 font-bold">${product.price}</span>
                                <span className="text-sm text-gray-600">Qty: {product.quantity}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Link
                    to="/shop"
                    className="inline-block bg-[#FE5F75] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#e14b61] transition"
                >
                    See More in Shop
                </Link>
            </div>
        </div>
    );
};

export default Promotion;
