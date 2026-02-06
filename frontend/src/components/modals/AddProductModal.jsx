import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Upload, Trash2, ChevronDown } from 'lucide-react';
import { productAPI } from '../../utils/api';

// ProductForm - provided by user
const ProductForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    category: '',
    price: '',
    product_image: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await productAPI.createProduct({
        ...formData,
        price: parseFloat(formData.price),
      });

      if (response.success) {
        alert('Product created successfully!');
        setFormData({
          product_name: '',
          category: '',
          price: '',
          product_image: '',
          description: '',
        });
        onSuccess && onSuccess();
      } else {
        throw new Error(response.message || 'Failed to create product');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          >
            <option value="">Select a category</option>
            <option value="Beaded Necklace">Beaded Necklace</option>
            <option value="Beaded Tops">Beaded Tops</option>
            <option value="Beaded Bags">Beaded Bags</option>
            <option value="Beaded Bracelet">Beaded Bracelet</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (₦)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image URL</label>
          <input
            type="url"
            name="product_image"
            value={formData.product_image}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
          />
        </div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#D4AF37] text-white py-2 px-4 rounded-lg hover:bg-[#B8941F] disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

const AddProductModal = ({ isOpen, closeModal }) => {
  const handleSuccess = () => {
    // close modal and notify listeners so parent can refresh list
    closeModal();
    window.dispatchEvent(new Event('productCreated'));
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Backdrop */}
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <Dialog.Title className="text-lg font-bold text-gray-900">Add Product</Dialog.Title>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={20} />
                  </button>
                </div>

                {/* Body: use ProductForm */}
                <ProductForm onSuccess={handleSuccess} />

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddProductModal;
