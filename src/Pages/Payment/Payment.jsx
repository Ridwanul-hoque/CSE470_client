// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// import React from 'react';




// const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key)
// const Payment = () => {
//     return (
//         <div>
//             <Elements stripe={stripePromise}>

//             </Elements>
            
//         </div>
//     );
// };

// export default Payment;


import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { ArrowLeft, CreditCard, Truck } from 'lucide-react';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';
import CashOnDeliveryForm from './CashOnDeliveryForm';
import OrderSummary from './OrderSummary';
import { AuthContext } from '../../Providers/AuthProviders';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const Payment = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    if (user && user.email) {
      fetchUserCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/cart?userEmail=${user.email}`);
      const userItems = res.data.filter(item => item.userEmail === user.email);
      setCart(userItems);

      if (userItems.length > 0) {
        createPaymentIntent(userItems);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
      setLoading(false);
    }
  };

  const createPaymentIntent = async (cartItems) => {
    try {
      const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      
      const response = await axios.post('http://localhost:5000/create-payment-intent', {
        amount: total * 100,
        userEmail: user.email
      });
      
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const qty = item.quantity || 1;
      return total + item.price * qty;
    }, 0);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleOrderComplete = async (paymentData) => {
    setOrderProcessing(true);
    
    try {
      await axios.post('http://localhost:5000/history', {
        ...paymentData,
        userEmail: user.email,
        items: cart,
        totalAmount: getTotalPrice(),
        paymentMethod: paymentMethod,
        orderDate: new Date()
      });

      await Promise.all(cart.map(item => 
        axios.delete(`http://localhost:5000/cart/${item._id}?userEmail=${user.email}`)
      ));

      setOrderComplete(true);
      setTimeout(() => {
        navigate('/dashboard/order-history');
      }, 2000);

    } catch (error) {
      console.error("Error processing order:", error);
    } finally {
      setOrderProcessing(false);
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <p>Loading your cart items...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="p-6 border rounded-lg shadow-md bg-gray-50">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <button 
            onClick={() => navigate('/shop')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-5">
          <OrderSummary cart={cart} />
        </div>

        <div className="md:col-span-7">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <button
                className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                  paymentMethod === 'online' 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handlePaymentMethodChange('online')}
              >
                <CreditCard className="w-8 h-8 mb-2 text-blue-600" />
                <span className="font-medium">Online Payment</span>
              </button>
              
              <button
                className={`p-4 border rounded-lg flex flex-col items-center justify-center transition-all ${
                  paymentMethod === 'cod' 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handlePaymentMethodChange('cod')}
              >
                <Truck className="w-8 h-8 mb-2 text-blue-600" />
                <span className="font-medium">Cash on Delivery</span>
              </button>
            </div>
            
            <div className={`transition-all duration-300 ${paymentMethod ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
              {paymentMethod === 'online' && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm onOrderComplete={handleOrderComplete} processing={orderProcessing} />
                </Elements>
              )}
              
              {paymentMethod === 'cod' && (
                <CashOnDeliveryForm onOrderComplete={handleOrderComplete} processing={orderProcessing} />
              )}
            </div>
            
            {orderComplete && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200 text-center">
                <p className="font-medium">Order placed successfully! Redirecting...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default Payment;