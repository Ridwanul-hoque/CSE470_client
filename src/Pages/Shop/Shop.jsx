import React, { useState, useEffect } from "react";
import productsData from "./products";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [filterTag, setFilterTag] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");
  const [cartItems, setCartItems] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const filtered = productsData.filter(product =>
    filterTag === "all" ? true : product.tag === filterTag
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    if (sortOrder === "alphabetical") return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-4">Shop</h2>
      <FilterBar
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sorted.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={() => {
          if (cartItems.length > 0) {
            navigate("/cart");
          } else {
            alert("No products in cart.");
          }
        }}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg flex items-center space-x-2 hover:bg-blue-700 z-50"
      >
        🛒
        {cartItems.length > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {cartItems.length}
          </span>
        )}
      </button>
    </div>
  );
};

export default Shop;
