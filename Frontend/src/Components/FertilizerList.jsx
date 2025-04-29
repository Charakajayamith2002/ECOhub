import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FertilizerList = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    fetchFertilizers();
  }, []); // Changed to empty array to run only once on mount

  const fetchFertilizers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products/fertilizers');
      setFertilizers(response.data);
    } catch (error) {
      console.error('Error fetching fertilizers:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/fertilizers/${id}`);
      fetchFertilizers(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting fertilizer:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateFertilizer/${id}`); // Navigate to update page with fertilizer ID
  };

  const handleAddFertilizer = () => {
    navigate('/addFertilizers'); // Navigate to add fertilizer page
  };

  return (
    <div className="container mx-auto p-6 mb-40 mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="mt-12 text-2xl font-semibold"><span className="text-green-500" >Fertilizer</span> Marketplace</h1>
        <button
          onClick={handleAddFertilizer}
          className="bg-black text-green-400 py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Add Fertilizer
        </button>
      </div>
      <table className="min-w-full bg-white border border-black shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="py-3 px-4 font-semibold">Title</th>
            <th className="py-3 px-4 font-semibold">Description</th>
            <th className="py-3 px-4 font-semibold">Price</th>
            <th className="py-3 px-4 font-semibold">Stock</th>
            <th className="py-3 px-4 font-semibold">Image</th>
            <th className="py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fertilizers.map((fertilizer) => (
            <tr key={fertilizer._id} className="border-t border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{fertilizer.title}</td>
              <td className="py-3 px-4">{fertilizer.des}</td>
              <td className="py-3 px-4">Rs.{fertilizer.price}</td>
              <td className="py-3 px-4">{fertilizer.stock}</td>
              <td className="py-3 px-4">
                <img
                  src={`data:image/jpeg;base64,${fertilizer.image}`}
                  alt={fertilizer.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </td>
              <td className="py-3 px-4 mt-5">
                <button
                  onClick={() => handleUpdate(fertilizer._id)}
                  className="bg-black text-green-400 py-1 px-3 mr-2 rounded-md hover:bg-gray-700 mb-5"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(fertilizer._id)}
                  className="bg-black text-green-400 py-1 px-3 rounded-md hover:bg-gray-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FertilizerList;
