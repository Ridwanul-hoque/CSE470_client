import React from "react";

const ProductCard = ({ product, onAddToCart, disabled = false }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col space-y-3">
      <img
        src={product.image}
        alt={product.productName}
        className="w-full h-48 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h3 className="text-lg font-bold">{product.productName}</h3>
        <p className="text-gray-600 mb-1">{product.description}</p>
        <p className="text-blue-700 font-semibold">Price: ৳{product.price}</p>

        {product.tag === "used" && (
          <>
            <p className="text-gray-600">📍 Address: {product.address}</p>
            <p className="text-gray-600">📞 Phone: {product.phone}</p>
          </>
        )}

        {product.tag === "business" && (
          <>
            <p className="text-gray-600">🛠 Type: {product.productType}</p>
            <p className="text-gray-600">📦 Quantity: {product.quantity}</p>
          </>
        )}
      </div>

      <button
        onClick={() => onAddToCart(product)}
        disabled={disabled}
        className={`mt-auto px-4 py-2 rounded text-white transition duration-200 ${
          disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {disabled
          ? product.tag === "business"
            ? "Out of Stock"
            : "Already in Cart"
          : "Add to Cart"}
      </button>
    </div>
  );
};

export default ProductCard;
