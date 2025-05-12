import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';

const OrderHistory = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/history?userEmail=${user.email}`)
                .then(res => res.json())
                .then(data => setOrders(data))
                .catch(err => console.error('Fetch error:', err));
        }
    }, [user]);

    return (
        <div className="p-4 grid md:grid-cols-2 gap-6">
            {orders.map((order, index) => {
                const total = order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
                const address = order?.address?.address;

                return (
                    <div
                        key={index}
                        className="bg-white shadow-xl rounded-2xl p-4 border hover:shadow-2xl transition duration-300"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">{order.name}</h2>
                                <p className="text-gray-600">
                                    Total Paid: <span className="font-bold text-green-600">${total}</span>
                                </p>
                            </div>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                On route to delivery
                            </span>
                        </div>

                        <details className="mt-4">
                            <summary className="cursor-pointer text-sm text-blue-600 hover:underline">
                                View Details
                            </summary>
                            <div className="mt-2 text-sm text-gray-700 space-y-1">
                                <p><strong>Phone:</strong> {order.phone}</p>
                                <p><strong>Payment ID:</strong> {order.paymentId}</p>
                                <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
                                <p><strong>Shipping Address:</strong> 
                                    {address 
                                        ? `${address.line1 || ''}, ${address.city || ''}, ${address.state || ''}, ${address.postal_code || ''}` 
                                        : 'N/A'}
                                </p>
                                <p><strong>Country:</strong> {address?.country || 'N/A'}</p>
                                <div>
                                    <strong>Items:</strong>
                                    <ul className="list-disc ml-5">
                                        {order.items?.map((item, idx) => (
                                            <li key={idx}>
                                                {item.productName} — {item.quantity} × ${item.price}
                                            </li>
                                        )) || <li>No items</li>}
                                    </ul>
                                </div>
                            </div>
                        </details>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderHistory;
