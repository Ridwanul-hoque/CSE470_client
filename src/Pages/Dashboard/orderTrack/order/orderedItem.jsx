import React from 'react';

const orderedItems = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: '$99.99',
    status: 'In Progress',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: '$199.99',
    status: 'Delivered',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Gaming Mouse',
    price: '$49.99',
    status: 'In Progress',
    image: 'https://via.placeholder.com/150',
  },
];

const OrderedItem = () => {
  return (
    <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
      <h1 style={{ marginBottom: '40px', fontSize: '32px' }}>Ordered Items</h1>
      {orderedItems.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: 'white' }}>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Image</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Name</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Price</th>
              <th style={{ padding: '10px', border: '1px solid #ccc' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orderedItems.map((item) => (
              <tr key={item.id} style={{ backgroundColor: '#1A1A2E', color: 'white' }}>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>
                  <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                </td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ccc' }}>{item.price}</td>
                <td
                  style={{
                    padding: '10px',
                    border: '1px solid #ccc',
                    color: item.status === 'Delivered' ? 'green' : 'orange',
                    fontWeight: 'bold',
                  }}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderedItem;