
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Car, DollarSign, Image, FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CarForm = ({ car, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: car?.name || '',
    description: car?.description || '',
    price: car?.price || '',
    image_url: car?.image_url || '',
    country: car?.country || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price)
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-2xl p-8"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {car ? 'Edit Car' : 'Add New Car'}
        </h2>
        <Button onClick={onCancel} variant="ghost" size="sm">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Car className="inline h-4 w-4 mr-1" />
                Car Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., 2023 BMW M3"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="inline h-4 w-4 mr-1" />
                Car Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Germany"
                required
              />
            </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="inline h-4 w-4 mr-1" />
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="input-field resize-none"
            placeholder="Enter detailed description of the car..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="inline h-4 w-4 mr-1" />
            Price (USD)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="input-field"
            placeholder="Enter price in USD"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Image className="inline h-4 w-4 mr-1" />
            Image URL
          </label>
          <input
            type="url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="input-field"
            placeholder="https://example.com/image.png"
            required
          />
          {formData.image_url && (
            <div className="mt-3">
              <img
                src={formData.image_url}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" className="btn-primary flex-1">
            {car ? 'Update Car' : 'Add Car'}
          </Button>
          <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default CarForm;
