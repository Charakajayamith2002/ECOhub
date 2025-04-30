/// AddFertilizerForm.jsx
import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddFertilizerForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    des: '',
    price: '',
    stock: '',
    image: null,
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let errors = {};

    // Validate Title: letters and numbers only, at least 3 characters
    if (!formData.title.trim()) {
      errors.title = 'Title is required.';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.title)) {
      errors.title = 'Title can only contain letters and numbers.';
    } else if (formData.title.length < 3) {
      errors.title = 'Title must be at least 3 characters long.';
    }

    // Validate Description: letters and numbers only, at least 10 characters
    if (!formData.des.trim()) {
      errors.des = 'Description is required.';
    } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.des)) {
      errors.des = 'Description can only contain letters and numbers.';
    } else if (formData.des.length < 10) {
      errors.des = 'Description must be at least 10 characters long.';
    }

    // Validate Price: positive number
    if (!formData.price || formData.price <= 0) {
      errors.price = 'Price must be a positive number.';
    } else if (isNaN(formData.price)) {
      errors.price = 'Price must be a valid number.';
    }

    // Validate Stock: positive integer
    if (!formData.stock || formData.stock <= 0) {
      errors.stock = 'Stock must be a positive number.';
    } else if (!Number.isInteger(Number(formData.stock))) {
      errors.stock = 'Stock must be a whole number.';
    }

    // Validate Image: check if an image is selected and if it's a valid type
    if (!formData.image) {
      errors.image = 'Image is required.';
    } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(formData.image.type)) {
      errors.image = 'Only JPG, PNG, or GIF files are allowed.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Check validation 

    const data = new FormData();
    data.append('title', formData.title);
    data.append('des', formData.des);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    data.append('image', formData.image);

    try {
      const response = await axios.post('http://localhost:4000/api/products/fertilizers', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      // Reset form after successful addition
      setFormData({ title: '', des: '', price: '', stock: '', image: null });
      
      // Navigate to the manageFertilizers page
      navigate('/manageFertilizers');
      
    } catch (error) {
      console.error('Error adding fertilizer:', error);
      setMessage('Failed to add fertilizer.');
    }
  };

  return (
    <div className="mt-32 container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add Fertilizer</h2>
      {message && <p className="text-center text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter fertilizer title"
            required
          />
          {errors.title && <p className="text-red-500 text-xs italic">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="des">
            Description
          </label>
          <textarea
            name="des"
            value={formData.des}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
            required
          />
          {errors.des && <p className="text-red-500 text-xs italic">{errors.des}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price"
            required
          />
          {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter stock quantity"
            required
          />
          {errors.stock && <p className="text-red-500 text-xs italic">{errors.stock}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          {errors.image && <p className="text-red-500 text-xs italic">{errors.image}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-black text-green-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-gray-700"
          >
            Add Fertilizer
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFertilizerForm;