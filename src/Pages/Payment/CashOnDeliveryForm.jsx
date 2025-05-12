import React, { useState } from 'react';

const CashOnDeliveryForm = ({ onOrderComplete, processing }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }

    if (!phone.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (!address.trim()) {
      setError('Please enter your address');
      return;
    }

    if (!city.trim() || !state.trim() || !postalCode.trim()) {
      setError('Please complete your address information');
      return;
    }

    setError(null);

    onOrderComplete({
      name,
      phone,
      address: {
        line1: address,
        city,
        state,
        postal_code: postalCode
      },
      paymentMethod: 'cash_on_delivery'
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="cod-name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            id="cod-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <label htmlFor="cod-phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            id="cod-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="cod-address" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            id="cod-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your street address"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cod-city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              id="cod-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="City"
              required
            />
          </div>
          <div>
            <label htmlFor="cod-state" className="block text-sm font-medium text-gray-700 mb-1">
              State/Province
            </label>
            <input
              id="cod-state"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="State/Province"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="cod-postal" className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            id="cod-postal"
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Postal Code"
            required
          />
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={processing}
        className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors ${
          processing
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {processing ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
};

export default CashOnDeliveryForm;