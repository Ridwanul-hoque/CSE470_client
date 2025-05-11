// import React from 'react';
// import P1 from "../../../assets/p1.jpeg";
// import P2 from "../../../assets/p2.jpeg";
// import P3 from "../../../assets/p3.jpeg";
// import P4 from "../../../assets/p4.jpeg";
// import P5 from "../../../assets/p5.jpeg";

// const demoProducts = [
//   {
//     id: 1,
//     name: 'Wireless Headphones',
//     price: '$99.99',
//     description: 'High-quality wireless headphones with noise cancellation.',
//     image: P1,
//   },
//   {
//     id: 2,
//     name: 'Smart Watch',
//     price: '$199.99',
//     description: 'Track your fitness and stay connected with this smart watch.',
//     image: P2,
//   },
//   {
//     id: 3,
//     name: 'Gaming Mouse',
//     price: '$49.99',
//     description: 'Ergonomic gaming mouse with customizable buttons.',
//     image: P3,
//   },
//   {
//     id: 4,
//     name: 'Mechanical Keyboard',
//     price: '$99.99',
//     description: 'High Quality Mechanical Keyboard.',
//     image: P4,
//   },
//   {
//     id: 5,
//     name: 'Wireless Charger',
//     price: '$39.99',
//     description: 'Portable Wireless Charger.',
//     image: P5,
//   },
// ];

// const Products = () => {
//   const handleSeeMore = () => {
//     alert('See more products functionality coming soon!');
//   };

//   return (
//     <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
//       <h2 style={{ marginBottom: '20px' }} className='text-[#FE5F75] font-extrabold text-4xl'>Our Products</h2>
//       <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {demoProducts.map((product) => (
//           <div
//             key={product.id}
//             style={{
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//               padding: '16px',
//               textAlign: 'center',
//               width: '200px',
//               backgroundColor: '#1A1A2E',
//             }}
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               style={{ width: '100%', height: '150px', objectFit: 'cover' }}
//             />
//             <h3>{product.name}</h3>
//             <p>{product.description}</p>
//             <p style={{ fontWeight: 'bold' }}>{product.price}</p>
//             <button
//               style={{
//                 padding: '8px 16px',
//                 background: '#007BFF',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '4px',
//                 cursor: 'pointer',
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handleSeeMore}
//         style={{
//           marginTop: '20px',
//           padding: '10px 20px',
//           background: '#555555',
//           color: '#fff',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//         }}
//       >
//         See More Products
//       </button>
//     </div>
//   );
// };

// export default Products;