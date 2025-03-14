'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Mock cart data - in a real app, this would come from your cart state management
const cartItems: CartItem[] = [
  {
    id: '1',
    name: 'Premium Barbell Set',
    price: 299.99,
    quantity: 1,
    image: '/images/products/barbell-1.jpg'
  }
];

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'billing' | 'review'>('shipping');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('billing');
  };

  const handleBillingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to payment page
    window.location.href = '/checkout/payment';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Quarter Turn Marketplace
          </Link>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-8">
          {['shipping', 'billing', 'review'].map((s, index) => (
            <div key={s} className="flex items-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${step === s ? 'bg-blue-600 text-white' : 
                  index < ['shipping', 'billing', 'review'].indexOf(step) + 1 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-600'}
              `}>
                {index + 1}
              </div>
              <span className="ml-2 font-medium capitalize hidden sm:inline">
                {s}
              </span>
              {index < 2 && (
                <div className="w-24 h-1 mx-4 bg-gray-200">
                  <div className={`h-full ${
                    index < ['shipping', 'billing', 'review'].indexOf(step) 
                      ? 'bg-green-500' 
                      : 'bg-gray-200'
                  }`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {step === 'shipping' && (
                  <motion.form 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleShippingSubmit}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={shippingDetails.firstName}
                          onChange={(e) => setShippingDetails({...shippingDetails, firstName: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={shippingDetails.lastName}
                          onChange={(e) => setShippingDetails({...shippingDetails, lastName: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={shippingDetails.email}
                        onChange={(e) => setShippingDetails({...shippingDetails, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <input
                        type="text"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        value={shippingDetails.address}
                        onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={shippingDetails.city}
                          onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">State</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={shippingDetails.state}
                          onChange={(e) => setShippingDetails({...shippingDetails, state: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={shippingDetails.zipCode}
                          onChange={(e) => setShippingDetails({...shippingDetails, zipCode: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Country</label>
                        <select
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          value={shippingDetails.country}
                          onChange={(e) => setShippingDetails({...shippingDetails, country: e.target.value})}
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Continue to Billing
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === 'billing' && (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleBillingSubmit}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900">Billing Information</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Expiration Date</label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Back to Shipping
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Review Order
                      </button>
                    </div>
                  </motion.form>
                )}

                {step === 'review' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900">Review Order</h2>
                    <div className="border-t border-b py-4">
                      <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-gray-600">
                        {shippingDetails.firstName} {shippingDetails.lastName}<br />
                        {shippingDetails.address}<br />
                        {shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}<br />
                        {shippingDetails.country}
                      </p>
                    </div>
                    <div className="border-b pb-4">
                      <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                      <p className="text-gray-600">
                        Credit Card ending in ****3456
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setStep('billing')}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Back to Billing
                      </button>
                      <button
                        onClick={handleReviewSubmit}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Place Order
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-200" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-500">Quantity: {item.quantity}</p>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 