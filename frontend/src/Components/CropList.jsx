import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CropList = () => {
  const [crops, setCrops] = useState([]);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    fetchCrops();
  }, []); // Runs only once on component mount

  const fetchCrops = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/crop/all-crops');
      setCrops(response.data.crops);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/crop/delete-crop/${id}`);
      fetchCrops(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting crop:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-crop/${id}`); // Navigate to update page with crop ID
  };

  const handleAddCrop = () => {
    navigate('/AddCrop'); // Navigate to add crop page
  };

  return (
    <div className="container mx-auto p-6 mb-40 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Crop Marketplace</h2>
        <button
          onClick={handleAddCrop}
          className="bg-black text-green-400 py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Add Crop
        </button>
      </div>
      <table className="min-w-full bg-white border border-black shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-800 text-white text-left">
            <th className="py-3 px-4 font-semibold">Crop Name</th>
            <th className="py-3 px-4 font-semibold">Type</th>
            <th className="py-3 px-4 font-semibold">Location</th>
            <th className="py-3 px-4 font-semibold">Planting Date</th>
            <th className="py-3 px-4 font-semibold">Harvest Date</th>
            <th className="py-3 px-4 font-semibold">Image</th>
            <th className="py-3 px-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crops.map((crop) => (
            <tr key={crop._id} className="border-t border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{crop.cropName}</td>
              <td className="py-3 px-4">{crop.cropType}</td>
              <td className="py-3 px-4">{crop.fieldLocation}</td>
              <td className="py-3 px-4">{new Date(crop.plantingDate).toLocaleDateString()}</td>
              <td className="py-3 px-4">{new Date(crop.estimatedHarvestDate).toLocaleDateString()}</td>
              <td className="py-3 px-4">
                <img
                  src={crop.cropImage.url}
                  alt={crop.cropName}
                  className="w-24 h-24 object-cover rounded-md"
                />
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleUpdate(crop._id)}
                  className="bg-black text-green-400 py-1 px-3 mr-2 rounded-md hover:bg-gray-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(crop._id)}
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

export default CropList;
