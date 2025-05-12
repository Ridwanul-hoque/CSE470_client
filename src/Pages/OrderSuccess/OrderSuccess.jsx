import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

const OrderSuccess = () => {
  const { user } = useContext(AuthContext);
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.email) {
      fetchLatestOrder();
    }
  }, [user]);

  const fetchLatestOrder = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/history?userEmail=${user.email}`);
      const orders = response.data;
      if (orders.length > 0) {
        // Get the most recent order
        const latestOrder = orders[orders.length - 1];
        setOrderDetails(latestOrder);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching order:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="py-12 flex flex-col items-center">
        <div className="mb-6 text-green-500 animate-bounce">
          <CheckCircle size={80} />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been placed successfully and is being processed.
        </p>

        {orderDetails && (
          <div className="w-full bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="font-medium">Delivery Information</p>
                <p className="text-gray-600">{orderDetails.name}</p>
                <p className="text-gray-600">{orderDetails.phone}</p>
                <p className="text-gray-600">
                  {orderDetails.address.line1}, {orderDetails.address.city}
                  <br />
                  {orderDetails.address.state}, {orderDetails.address.postal_code}
                </p>
              </div>

              <div className="border-b pb-4">
                <p className="font-medium">Items Ordered</p>
                {orderDetails.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mt-2">
                    <span className="text-gray-600">
                      {item.productName} × {item.quantity || 1}
                    </span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold text-lg">${orderDetails.totalAmount.toFixed(2)}</span>
              </div>

              <div className="text-gray-600">
                <p className="font-medium">Payment Method</p>
                <p>{orderDetails.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-4 w-full">
          <Link to="/shop">
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2">
              <ShoppingBag size={20} />
              <span>Continue Shopping</span>
            </button>
          </Link>
          
          <Link to="/order-history">
            <button className="w-full bg-white text-gray-800 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-300">
              View Order History
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;