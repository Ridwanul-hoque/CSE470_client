import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../Providers/AuthProviders';

const OrderedItem = () => {
  const { user } = useContext(AuthContext);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/history?userEmail=${user.email}&role=seller`)
        .then(res => res.json())
        .then(data => {
          const strictlyFiltered = [];

          data.forEach(order => {
            if (order?.items && Array.isArray(order.items)) {
              const matchedItems = order.items.filter(
                item =>
                  item.email === user.email &&
                  item.tag === 'business'
              );
              strictlyFiltered.push(...matchedItems);
            }
          });

          setFilteredItems(strictlyFiltered);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching order history:', err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D2B] to-[#FE5F75] p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg p-8 text-white">
        <h2 className="text-3xl font-bold mb-6 text-center">🛍️ Your Sold Business Items</h2>

        {loading ? (
          <p className="text-center text-white text-lg">Loading orders...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-white text-lg">No business items sold yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-white/20">
            <table className="min-w-full text-sm text-white table-auto backdrop-blur-md">
              <thead className="bg-white/20">
                <tr>
                  <th className="px-4 py-3 border border-white/10">Image</th>
                  <th className="px-4 py-3 border border-white/10">Product Name</th>
                  <th className="px-4 py-3 border border-white/10">Type</th>
                  <th className="px-4 py-3 border border-white/10">Description</th>
                  <th className="px-4 py-3 border border-white/10">Price</th>
                  <th className="px-4 py-3 border border-white/10">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, index) => (
                  <tr key={index} className="hover:bg-[#FE5F75]/20 transition">
                    <td className="px-4 py-3 border border-white/10">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded shadow-md"
                      />
                    </td>
                    <td className="px-4 py-3 border border-white/10">{item.productName}</td>
                    <td className="px-4 py-3 border border-white/10">{item.productType}</td>
                    <td className="px-4 py-3 border border-white/10">{item.description}</td>
                    <td className="px-4 py-3 border border-white/10">${item.price}</td>
                    <td className="px-4 py-3 border border-white/10">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderedItem;
