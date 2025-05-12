import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Providers/AuthProviders';

const OrderedItem = () => {
  const { user } = useContext(AuthContext);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/history?userEmail=${user.email}`)
        .then(res => res.json())
        .then(data => {
          // Extract and filter items that match the logged-in user's email AND have tag 'business'
          const strictlyFiltered = [];

          data.forEach(order => {
            if (order?.items && Array.isArray(order.items)) {
              const matchedItems = order.items.filter(
                item =>
                  item.userEmail === user.email && // Must belong to this user
                  item.tag === 'business'          // Must be tagged as business
              );
              strictlyFiltered.push(...matchedItems);
            }
          });

          setFilteredItems(strictlyFiltered);
        })
        .catch(err => console.error('Error fetching order history:', err));
    }
  }, [user?.email]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Business Orders</h2>

      {filteredItems.length === 0 ? (
        <p>No business items found in your orders.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Image</th>
                <th className="px-4 py-2 border">Product Name</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2 border">{item.productName}</td>
                  <td className="px-4 py-2 border">{item.productType}</td>
                  <td className="px-4 py-2 border">{item.description}</td>
                  <td className="px-4 py-2 border">${item.price}</td>
                  <td className="px-4 py-2 border">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderedItem;
