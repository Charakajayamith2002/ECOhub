// UpdateFertilizerForm.jsx
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateFertilizerForm = () => {
  const { id } = useParams(); // Get the fertilizer ID from URL parameters
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

  useEffect(() => {
    fetchFertilizerDetails();
  }, []);

  const fetchFertilizerDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/getsingleFertilizer/${id}`);
      const { title, des, price, stock } = response.data;
      setFormData({ title, des, price, stock, image: null });
    } catch (error) {
      console.error('Error fetching fertilizer details:', error);
    }
  };

  const validate = () => {
    let errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required.';
    else if (!/^[a-zA-Z0-9\s]+$/.test(formData.title)) errors.title = 'Title can only contain letters and numbers.';

    if (!formData.des.trim()) errors.des = 'Description is required.';
    else if (!/^[a-zA-Z0-9\s]+$/.test(formData.des)) errors.des = 'Description can only contain letters and numbers.';

    if (!formData.price || formData.price <= 0) errors.price = 'Price must be a positive number.';
    
    if (!formData.stock || formData.stock <= 0) errors.stock = 'Stock must be a positive number.';

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
    if (!validate()) return; // Check validation before submission

    const data = new FormData();
    data.append('title', formData.title);
    data.append('des', formData.des);
    data.append('price', formData.price);
    data.append('stock', formData.stock);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      const response = await axios.put(`http://localhost:4000/api/products/fertilizers/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      navigate('/manageFertilizers'); // Redirect to the manage fertilizers page
    } catch (error) {
      console.error('Error updating fertilizer:', error);
      setMessage('Failed to update fertilizer.');
    }
  };

  return (
    <div className="mt-32 container mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Update Fertilizer</h2>
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
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-black text-green-400 py-2 px-4 rounded-md hover:bg-gray-700"
          >
            Update Fertilizer
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFertilizerForm;//Export
