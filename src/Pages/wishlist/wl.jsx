import React, { useState, useEffect } from "react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState(() => {
    // Load wishlist from localStorage on component mount
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  useEffect(() => {
    // Save wishlist to localStorage whenever it changes
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="border rounded-2xl shadow-md p-4 flex flex-col items-center bg-white"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-gray-600 mb-2">${product.price}</p>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;