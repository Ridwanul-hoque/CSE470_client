import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <span className={`text-xs inline-block mt-1 px-2 py-1 rounded ${
        product.tag === "secondhand" ? "bg-yellow-300" : "bg-green-300"
      }`}>
        {product.tag === "secondhand" ? "Second Hand" : "Small Business"}
      </span>
    </div>
  );
};

export default ProductCard;
