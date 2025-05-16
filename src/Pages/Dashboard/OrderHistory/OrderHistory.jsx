import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Providers/AuthProviders';


const OrderHistory = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            // Add the role=buyer parameter to explicitly fetch buyer orders
            fetch(`http://localhost:5000/history?userEmail=${user.email}&role=buyer`)
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Fetch error:', err);
                    setLoading(false);
                });
        }
    }, [user]);

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Order History</h2>
            
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : orders.length === 0 ? (
                <div className="bg-white shadow rounded-lg p-6 text-center">
                    <p className="text-gray-600">You haven't placed any orders yet.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {orders.map((order, index) => {
                        const total = order.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
                        const address = order?.address?.address;
                        
                        // Determine status color
                        const statusColor = 
                            order.paymentStatus === "succeeded" ? "green" : 
                            order.paymentStatus === "pending" ? "yellow" : "red";

                        return (
                            <div
                                key={index}
                                className="bg-white shadow-xl rounded-2xl p-5 border border-gray-100 hover:shadow-2xl transition duration-300"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">{order.name}</h2>
                                        <p className="text-gray-600">
                                            Total Paid: <span className="font-bold text-green-600">${total.toFixed(2)}</span>
                                        </p>
                                    </div>
                                    <span className={`bg-${statusColor}-100 text-${statusColor}-800 px-3 py-1 rounded-full text-sm font-medium`}>
                                        {order.paymentStatus === "succeeded" ? "Paid" : order.paymentStatus}
                                    </span>
                                </div>
                                
                                <div className="text-sm text-gray-500 mb-4">
                                    Order ID: <span className="font-mono">{order._id?.substring(0, 8) || 'N/A'}</span>
                                </div>

                                <details className="group">
                                    <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center">
                                        <span>View Details</span>
                                        <svg className="w-4 h-4 ml-1 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="mt-3 text-sm text-gray-700 space-y-2 bg-gray-50 p-3 rounded-lg">
                                        <p><span className="font-medium">Phone:</span> {order.phone || 'N/A'}</p>
                                        <p><span className="font-medium">Payment ID:</span> {order.paymentId || 'N/A'}</p>
                                        <p><span className="font-medium">Payment Status:</span> {order.paymentStatus || 'N/A'}</p>
                                        <p>
                                            <span className="font-medium">Shipping Address:</span> 
                                            {address 
                                                ? `${address.line1 || ''}, ${address.city || ''}, ${address.state || ''}, ${address.postal_code || ''}` 
                                                : 'N/A'}
                                        </p>
                                        <p><span className="font-medium">Country:</span> {address?.country || 'N/A'}</p>
                                        <div className="mt-3">
                                            <span className="font-medium">Items:</span>
                                            <ul className="mt-2 space-y-2">
                                                {order.items?.map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 bg-white p-2 rounded border">
                                                        {item.image && (
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.productName} 
                                                                className="w-12 h-12 object-cover rounded"
                                                                onError={(e) => {
                                                                    e.currentTarget.src = 'https://placehold.co/100x100?text=No+Image';
                                                                }}
                                                            />
                                                        )}
                                                        <div>
                                                            <div className="font-medium">{item.productName}</div>
                                                            <div className="text-gray-600">
                                                                {item.quantity} × ${item.price} = ${item.quantity * item.price}
                                                            </div>
                                                        </div>
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
            )}
        </div>
    );
};

export default OrderHistory;