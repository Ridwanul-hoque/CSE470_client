import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get("http://localhost:5000/cart");
      setCart(res.data);
    };
    fetchCart();
  }, []);

  const removeItem = async (id, tag, quantity = 1) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${id}`);
      setCart(prev => prev.filter(item => item._id !== id));

      if (tag === "used") {
        setProducts(prev =>
          prev.map(p => p._id === id ? { ...p, disabled: false } : p)
        );
      }

      if (tag === "business") {
        setProducts(prev =>
          prev.map(p =>
            p._id === id ? { ...p, quantity: p.quantity + quantity } : p
          )
        );
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };


  // Calculate total number of items in the cart
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  return (
    <div className="cart-page max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* If cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Cart items list */}
          <ul className="space-y-4">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center border p-4 rounded">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p>
                      ${item.price}
                      {item.quantity ? ` x ${item.quantity}` : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item._id, item.tag, item.quantity)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Total number of items in cart */}
          <div className="mt-4 text-right">
            <p className="font-semibold">Total items: {getTotalItems()}</p>
          </div>
        </>
      )}

      {/* Button to go back to shop */}
      <div className="mt-6 flex justify-between">
        <Link to="/shop">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Back to Shop
          </button>
        </Link>
        {/* Optionally add a checkout button here */}
        {cart.length > 0 && (
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
