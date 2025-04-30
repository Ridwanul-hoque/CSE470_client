import React from 'react';
import U1 from "../../../assets/u1.jpeg";
import U2 from "../../../assets/u2.jpeg";
import U3 from "../../../assets/u3.jpeg";

const userProducts = [
  {
    id: 1,
    name: 'Used DSLR Camera',
    price: '$299.99',
    description: 'A well-maintained DSLR camera with a 24MP sensor.',
    image: U1,
  },
  {
    id: 2,
    name: 'Gaming Chair',
    price: '$149.99',
    description: 'Ergonomic gaming chair in excellent condition.',
    image: U2,
  },
  {
    id: 3,
    name: 'Electric Guitar',
    price: '$199.99',
    description: 'Pre-owned electric guitar with amplifier included.',
    image: U3,
  },
];

const UserProducts = () => {
  const handleAddToCart = (productName) => {
    alert(`${productName} has been added to your cart!`);
  };

  return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
      {/* Page Title */}
      <h2 style={{ marginBottom: '40px', fontSize: '32px' }}>User Uploaded Products</h2>

      {/* User Products Section */}
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {userProducts.map((product) => (
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

export default UserProducts;