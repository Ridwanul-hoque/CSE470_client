// import React, { useState, useEffect, useContext } from "react";
// import ProductCard from "./ProductCard";
// import FilterBar from "./FilterBar";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../../Providers/AuthProviders";

// const Shop = () => {
//   const {user} =useContext(AuthContext)
//   const [products, setProducts] = useState([]);
//   const [filterTag, setFilterTag] = useState("all");
//   const [sortOrder, setSortOrder] = useState("default");
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const [oldRes, businessRes] = await Promise.all([
//           axios.get("http://localhost:5000/old"),
//           axios.get("http://localhost:5000/inventory")
//         ]);
//         const combined = [...oldRes.data, ...businessRes.data];
//         setProducts(combined);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/cart");
//         setCartItems(res.data);
//       } catch (error) {
//         console.error("Failed to fetch cart items:", error);
//       }
//     };
//     fetchCart();
//   }, []);

//   const handleAddToCart = async (product) => {
//     try {
//       const response = await axios.post("http://localhost:5000/cart",{...product, userEmail:user.email});

//       if (product.tag === "used") {
//         setProducts(prev =>
//           prev.map(p => p._id === product._id ? { ...p, disabled: true } : p)
//         );
//         setCartItems(prev => [...prev, { ...product, quantity: 1 }]);
//       }

//       if (product.tag === "business") {
//         setCartItems(prev => {
//           const exists = prev.find(i => i._id === product._id);
//           return exists
//             ? prev.map(i => i._id === product._id
//               ? { ...i, quantity: i.quantity + 1 }
//               : i
//             )
//             : [...prev, { ...product, quantity: 1 }];
//         });

//         setProducts(prev =>
//           prev.map(p => p._id === product._id
//             ? { ...p, quantity: p.quantity - 1 }
//             : p
//           )
//         );
//       }
//     } catch (err) {
//       if (err.response?.status === 409) {
//         alert("Used item already in cart");
//       } else if (err.response?.status === 400) {
//         alert("Product out of stock");
//       } else {
//         console.error("Add to cart failed:", err);
//       }
//     }
//   };





//   // const handleRemoveFromCart = async (productId) => {
//   //   try {
//   //     await axios.delete(`http://localhost:5000/cart/${productId}`);
//   //     const updatedCart = cartItems.filter(item => item._id !== productId);
//   //     setCartItems(updatedCart);

//   //     const removedItem = cartItems.find(item => item._id === productId);

//   //     if (removedItem) {
//   //       if (removedItem.tag === "business") {
//   //         // await axios.patch(`http://localhost:5000/inventory/${productId}`, {
//   //         //   quantity: removedItem.quantity + 1
//   //         // });

//   //         setProducts(prev =>
//   //           prev.map(p =>
//   //             p._id === productId ? { ...p, quantity: p.quantity + 1 } : p
//   //           )
//   //         );
//   //       }

//   //       if (removedItem.tag === "used") {
//   //         setProducts(prev =>
//   //           prev.map(p => p._id === productId ? { ...p, disabled: false } : p)
//   //         );
//   //       }
//   //     }
//   //   } catch (error) {
//   //     console.error("Error removing from cart:", error);
//   //   }
//   // };

//   const isProductDisabled = (product) => {
//     if (product.tag === "used") {
//       return cartItems.some(item => item._id === product._id);
//     }
//     if (product.tag === "business") {
//       return product.quantity <= 0;
//     }
//     return false;
//   };

//   const filtered = products.filter(product =>
//     filterTag === "all" ? true : product.tag === filterTag
//   );

//   const sorted = [...filtered].sort((a, b) => {
//     if (sortOrder === "asc") return a.price - b.price;
//     if (sortOrder === "desc") return b.price - a.price;
//     if (sortOrder === "alphabetical") return a.productName.localeCompare(b.productName);
//     return 0;
//   });

//   const oldItems = sorted.filter(product => product.tag === "used");
//   const businessItems = sorted.filter(product => product.tag === "business");

//   return (
//     <div className="max-w-6xl mx-auto p-4 relative">
//       <h2 className="text-2xl font-bold mb-4">Shop</h2>
//       <FilterBar
//         filterTag={filterTag}
//         setFilterTag={setFilterTag}
//         sortOrder={sortOrder}
//         setSortOrder={setSortOrder}
//       />

//       <h3 className="text-xl font-semibold mt-6 mb-2">Used Items</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {oldItems.map(product => (
//           <ProductCard
//             key={product._id}
//             product={product}
//             onAddToCart={handleAddToCart}
//             disabled={isProductDisabled(product)}
//           />
//         ))}
//       </div>

//       <h3 className="text-xl font-semibold mt-10 mb-2">Business Items</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {businessItems.map(product => (
//           <ProductCard
//             key={product._id}
//             product={product}
//             onAddToCart={handleAddToCart}
//             disabled={isProductDisabled(product)}
//           />
//         ))}
//       </div>

//       <button
//         onClick={() => {
//           if (cartItems.length > 0) {
//             navigate("/cart");
//           } else {
//             alert("No products in cart.");
//           }
//         }}
//         className="fixed top-5 right-5 bg-[#FE5F75] text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-700 z-50"
//       >
//         🛒
//         {cartItems.length > 0 && (
//           <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
//             {cartItems.length}
//           </span>
//         )}
//       </button>
//     </div>
//   );
// };

// export default Shop;




import React, { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Providers/AuthProviders";
import { ShoppingCart } from 'lucide-react';
import Swal from "sweetalert2";

const Shop = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filterTag, setFilterTag] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [oldRes, businessRes] = await Promise.all([
          axios.get("http://localhost:5000/old"),
          axios.get("http://localhost:5000/inventory")
        ]);
        const combined = [...oldRes.data, ...businessRes.data];
        setProducts(combined);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (user && user.email) {
      fetchUserCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchUserCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart?userEmail=${user.email}`);
      // Filter to only include items that match the current user's email
      const userItems = res.data.filter(item => item.userEmail === user.email);
      setCartItems(userItems);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      alert("Please log in to add items to your cart");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/cart", {
        ...product,
        userEmail: user.email
      });

      if (product.tag === "used") {
        setProducts(prev =>
          prev.map(p => p._id === product._id ? { ...p, disabled: true } : p)
        );
        setCartItems(prev => [...prev, { ...product, quantity: 1, userEmail: user.email }]);
      }

      if (product.tag === "business") {
        setCartItems(prev => {
          const exists = prev.find(i => i._id === product._id && i.userEmail === user.email);
          return exists
            ? prev.map(i => (i._id === product._id && i.userEmail === user.email)
              ? { ...i, quantity: i.quantity + 1 }
              : i
            )
            : [...prev, { ...product, quantity: 1, userEmail: user.email }];
        });

        setProducts(prev =>
          prev.map(p => p._id === product._id
            ? { ...p, quantity: p.quantity - 1 }
            : p
          )
        );
      }
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Used item already in cart");
      } else if (err.response?.status === 400) {
        alert("Product out of stock");
      } else {
        console.error("Add to cart failed:", err);
      }
    }
  };

  const isProductDisabled = (product) => {
    if (!user) return false;

    if (product.tag === "used") {
      return cartItems.some(item =>
        item._id === product._id && item.userEmail === user.email
      );
    }
    if (product.tag === "business") {
      return product.quantity <= 0;
    }
    return false;
  };

  const filtered = products.filter(product =>
    filterTag === "all" ? true : product.tag === filterTag
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    if (sortOrder === "alphabetical") return a.productName.localeCompare(b.productName);
    return 0;
  });

  const oldItems = sorted.filter(product => product.tag === "used");
  const businessItems = sorted.filter(product => product.tag === "business");

  // Get user-specific cart count
  const userCartCount = user ? cartItems.filter(item => item.userEmail === user.email).length : 0;



  const handleAddToWishlist = async (product) => {
    if (!user) {
      alert("Please log in to add to wishlist");
      return;
    }

    try {
      await axios.post("http://localhost:5000/wish", {
        ...product,
        useremail: user.email
      });
      Swal.fire({
        icon: 'success',
        title: 'Added To Your Wishlist!!!',
        text: 'This product is in your wishlist.',
        confirmButtonText: 'Perfect!',
        confirmButtonColor: '#e67e22',
        timer: 2000,
        timerProgressBar: true,
      });

    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire({
          icon: 'warning',
          title: 'Already Added!',
          text: 'This product is already in your wishlist.',
          confirmButtonText: 'Got it!',
          confirmButtonColor: '#e67e22',
          timer: 2000,
          timerProgressBar: true,
        });

      } else {
        console.error("Failed to add to wishlist:", error);
      }
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-4">Shop</h2>
      <FilterBar
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <h3 className="text-xl font-semibold mt-6 mb-2">Used Items</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {oldItems.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            disabled={isProductDisabled(product)}
          />
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-10 mb-2">Business Items</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {businessItems.map(product => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            disabled={isProductDisabled(product)}
          />
        ))}
      </div>

      <button
        onClick={() => {
          if (!user) {
            alert("Please log in to view your cart");
            return;
          }

          if (userCartCount > 0) {
            navigate("/cart");
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Your cart is empty!',
              text: 'Looks like you haven’t added any products yet.',
              showConfirmButton: true,
              confirmButtonText: 'Browse Products',
              confirmButtonColor: '#6c5ce7',
              backdrop: true,
            });
          }
        }}
        className="fixed top-5 right-5 bg-[#FE5F75] text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors duration-300 z-50"
      >
        <ShoppingCart size={20} />
        {userCartCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {userCartCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default Shop;