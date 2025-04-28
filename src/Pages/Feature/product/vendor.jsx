import React from 'react';
import V1 from "../../../assets/v1.jpeg";
import V2 from "../../../assets/v2.jpeg";
import V3 from "../../../assets/v3.jpeg";

const vendorProducts = [
  {
    id: 1,
    name: 'Gaming Laptop',
    price: '$999.99',
    description: 'High-performance gaming laptop for enthusiasts.',
    image: V1,
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: '$79.99',
    description: 'Compact wireless earbuds with noise cancellation.',
    image: V2,
  },
  {
    id: 3,
    name: 'Smartphone',
    price: '$699.99',
    description: 'Latest smartphone with cutting-edge features.',
    image: V3,
  },
];

const Vendor = () => {
  const handleAddToCart = (productName) => {
    alert(`${productName} has been added to your cart!`);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
      {/* Page Title */}
      <h1 style={{ marginBottom: '40px', fontSize: '32px' }}>Featured Products</h1>

      {/* Vendor Products Section */}
      <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>Products from Vendors</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {vendorProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center',
              width: '200px',
              backgroundColor: '#1A1A2E',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p style={{ fontWeight: 'bold' }}>{product.price}</p>
            <button
              onClick={() => handleAddToCart(product.name)}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                background: '#007BFF',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vendor;