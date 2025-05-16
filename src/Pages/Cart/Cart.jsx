// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

// const Cart = () => {
//   const [cart, setCart] = useState([]);
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchCart = async () => {
//       const res = await axios.get("http://localhost:5000/cart");
//       setCart(res.data);
//     };
//     fetchCart();
//   }, []);

//   const removeItem = async (id, tag, quantity = 1) => {
//     try {
//       await axios.delete(`http://localhost:5000/cart/${id}`);
//       setCart(prev => prev.filter(item => item._id !== id));

//       if (tag === "used") {
//         setProducts(prev =>
//           prev.map(p => p._id === id ? { ...p, disabled: false } : p)
//         );
//       }

//       if (tag === "business") {
//         setProducts(prev =>
//           prev.map(p =>
//             p._id === id ? { ...p, quantity: p.quantity + quantity } : p
//           )
//         );
//       }
//     } catch (err) {
//       console.error("Error removing item:", err);
//     }
//   };


//   // Calculate total number of items in the cart
//   const getTotalItems = () => {
//     return cart.reduce((total, item) => total + (item.quantity || 1), 0);
//   };
//   const getTotalPrice = () => {
//     return cart.reduce((total, item) => {
//       const qty = item.quantity || 1;
//       return total + item.price * qty;
//     }, 0);
//   };


//   return (
//     <div className="cart-page max-w-3xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

//       {/* If cart is empty */}
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           {/* Cart items list */}
//           <ul className="space-y-4">
//             {cart.map((item, index) => (
//               <li key={index} className="flex justify-between items-center border p-4 rounded">
//                 <div className="flex items-center space-x-4">
//                   <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded" />
//                   <div>
//                     <p className="font-semibold">{item.productName}</p>
//                     <p>
//                       ${item.price}
//                       {item.quantity ? ` x ${item.quantity}` : ""}
//                     </p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => removeItem(item._id, item.tag, item.quantity)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>

//           {/* Total number of items in cart */}
//           <div className="mt-4 text-right">
//             <p className="font-semibold">Total items: {getTotalItems()}</p>
//             <p className="font-semibold">Total price: ${getTotalPrice()}</p>
//           </div>
//         </>
//       )}

//       {/* Button to go back to shop */}
//       <div className="mt-6 flex justify-between">
//         <Link to="/shop">
//           <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//             Back to Shop
//           </button>
//         </Link>
//         {/* Optionally add a checkout button here */}
//         {cart.length > 0 && (
//           <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//             Proceed to Checkout
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;




import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProviders';
import { ArrowLeft, ShoppingBag, Trash2 } from 'lucide-react';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      fetchUserCart();
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [user]);

  const fetchUserCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/cart?userEmail=${user.email}`);
      // Filter to only include items that belong to the current user
      const userItems = res.data.filter(item => item.userEmail === user.email);
      setCart(userItems);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setLoading(false);
    }
  };

  const removeItem = async (id, tag, quantity = 1) => {
    try {
      // Include user email in the deletion request (via query parameter)
      await axios.delete(`http://localhost:5000/cart/${id}?userEmail=${user.email}`);
      
      // Update local state - remove item only for current user
      setCart(prev => prev.filter(item => 
        !(item._id === id && item.userEmail === user.email)
      ));

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

  // Calculate total number of items in the cart for the current user
  const getTotalItems = () => {
    return cart.reduce((total, item) => 
      total + (item.quantity || 1), 0
    );
  };

  // Calculate total price for the current user's cart items
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const qty = item.quantity || 1;
      return total + item.price * qty;
    }, 0);
  };

  if (!user) {
    return (
      <div className="cart-page max-w-3xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <div className="p-6 border rounded-lg shadow-md bg-gray-50">
          <p className="text-lg mb-4">Please log in to view your cart.</p>
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300">
              Log In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="cart-page max-w-3xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p>Loading your cart items...</p>
      </div>
    );
  }

  return (
    <div className="cart-page max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* If cart is empty */}
      {cart.length === 0 ? (
        <div className="text-center p-8 border rounded-lg shadow-md bg-gray-50">
          <div className="flex justify-center mb-4">
            <ShoppingBag size={48} className="text-gray-400" />
          </div>
          <p className="text-lg mb-4">Your cart is empty.</p>
          <p className="text-gray-600 mb-6">Add some great products to your cart!</p>
          <Link to="/shop">
            <button className="bg-gradient-to-br from-[#FE5F75] to-[#0D0D2B] hover:from-[#FF7A85] hover:to-[#1A1A40] text-white px-6 py-2 rounded-md transition-colors duration-300">
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Cart items list */}
          <ul className="space-y-4 mb-6">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold">{item.productName}</p>
                    <p className="text-gray-700">
                      ${item.price}
                      {item.quantity ? ` × ${item.quantity}` : ""}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item._id, item.tag, item.quantity)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors duration-300 flex items-center space-x-1"
                >
                  <Trash2 size={16} />
                  <span>Remove</span>
                </button>
              </li>
            ))}
          </ul>

          {/* Total number of items in cart */}
          <div className="mt-6 p-4 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span>Items:</span>
              <span>{getTotalItems()}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </>
      )}

      {/* Button to go back to shop */}
      <div className="mt-6 flex justify-between">
        {/* <Link to="/shop">
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            <ArrowLeft size={16} />
            <span>Back to Shop</span>
          </button>
        </Link> */}
        {/* Checkout button */}
        {cart.length > 0 && (
          <Link to={'/payment'} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-300">
            Proceed to Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;