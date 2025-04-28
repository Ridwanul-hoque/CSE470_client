import React, { useState } from "react";
import productsData from "./products";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";

const Shop = () => {
  const [filterTag, setFilterTag] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const filtered = productsData.filter(product =>
    filterTag === "all" ? true : product.tag === filterTag
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shop</h2>
      <FilterBar
        filterTag={filterTag}
        setFilterTag={setFilterTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sorted.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
