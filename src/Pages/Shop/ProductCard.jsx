import React from "react";
import { FaHeart } from "react-icons/fa"; // Import the heart icon

const ProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="border rounded-2xl shadow-md p-4 flex flex-col items-center bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
      <p className="text-gray-600 mb-2">${product.price}</p>

      <div className="flex space-x-2 mt-auto">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
          View Product
        </button>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
        >
          Add to Cart
        </button>
        <button
          onClick={() => onAddToWishlist(product)} // Add to wishlist handler
          className="text-red-500 hover:text-red-600 px-3 py-1 rounded-md text-sm flex items-center"
        >
          <FaHeart className="mr-1" /> Wishlist
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
