import React from 'react';

const OrderSummary = ({ cart = [] }) => {
  if (!cart) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p>Loading cart items...</p>
      </div>
    );
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => 
      total + (item.quantity || 1), 0
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const qty = item.quantity || 1;
      return total + item.price * qty;
    }, 0);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-4">
        {cart.map((item) => (
          <div key={item._id} className="flex items-center space-x-3">
            <img 
              src={item.image} 
              alt={item.productName} 
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <p className="font-medium">{item.productName}</p>
              <div className="flex justify-between text-sm text-gray-600">
                <span>
                  Qty: {item.quantity || 1}
                </span>
                <span>
                  ${item.price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({getTotalItems()} items)</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>Free</span>
        </div>
        
        <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;