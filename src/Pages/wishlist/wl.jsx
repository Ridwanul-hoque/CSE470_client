import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import axios from "axios";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    if (user && user.email) {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/wish");
      const userWishlist = res.data.filter(item => item.useremail === user.email);
      setWishlistItems(userWishlist);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/wish/${id}`);
      setWishlistItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Failed to delete wishlist item:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-4 space-y-2">
              <img
                src={item.image}
                alt={item.productName}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-bold">{item.productName}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-blue-700 font-semibold">Price: ৳{item.price}</p>
              {item.tag === "used" && (
                <>
                  <p className="text-gray-600">📍 Address: {item.address}</p>
                  <p className="text-gray-600">📞 Phone: {item.phone}</p>
                </>
              )}
              {item.tag === "business" && (
                <p className="text-gray-600">🛠 Type: {item.productType}</p>
              )}

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
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
