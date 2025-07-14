
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Phone, Car, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderModal = ({ car, onSubmit, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ car, phoneNumber });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Car</h2>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <Car className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-900">{car.name}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">
                ${parseFloat(car.price).toLocaleString()}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input-field"
                placeholder="+1 123-456-7890"
                required
                pattern="^\+?[1-9]\d{1,14}$"
                title="Please enter a valid phone number with country code (e.g., +1234567890)"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must include country code (e.g., +1, +44, +233).
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> By submitting, you agree to be contacted by our sales team at the provided phone number to complete the purchase.
              </p>
            </div>

            <div className="flex gap-4">
              <Button type="submit" className="btn-primary flex-1">
                Submit Order
              </Button>
              <Button type="button" onClick={onClose} variant="outline" className="flex-1">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderModal;
