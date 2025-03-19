import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCropForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cropName: '',
    cropType: '',
    fieldLocation: '',
    soilType: '',
    plantingDate: '',
    estimatedHarvestDate: '',
    growthStage: '',
    healthStatus: '',
    cropImage: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cropImage') {
      setFormData((prev) => ({ ...prev, cropImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validate form inputs
  const validate = () => {
    let errors = {};

    if (!formData.cropName.trim()) {
      errors.cropName = 'Crop name is required.';
    }
    if (!formData.cropType.trim()) {
      errors.cropType = 'Crop type is required.';
    }
    if (!formData.soilType.trim()) {
      errors.soilType = 'Soil type is required.';
    }
    if (!formData.growthStage.trim()) {
      errors.growthStage = 'Growth stage is required.';
    }
    if (!formData.healthStatus.trim()) {
      errors.healthStatus = 'Health status is required.';
    }

    // Validate dates
    const plantingDate = new Date(formData.plantingDate);
    const estimatedHarvestDate = new Date(formData.estimatedHarvestDate);
    if (estimatedHarvestDate <= plantingDate) {
      errors.dates = 'Estimated harvest date must be after planting date.';
    }

    // Image validation
    if (!formData.cropImage) {
      errors.cropImage = 'Crop image is required.';
    } else if (!['image/jpeg', 'image/png', 'image/gif'].includes(formData.cropImage.type)) {
      errors.cropImage = 'Only JPG, PNG, or GIF files are allowed.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append('cropName', formData.cropName);
    data.append('cropType', formData.cropType);
    data.append('fieldLocation', formData.fieldLocation);
    data.append('soilType', formData.soilType);
    data.append('plantingDate', formData.plantingDate);
    data.append('estimatedHarvestDate', formData.estimatedHarvestDate);
    data.append('growthStage', formData.growthStage);
    data.append('healthStatus', formData.healthStatus);
    data.append('cropImage', formData.cropImage);

    try {
      const response = await axios.post('http://localhost:4000/api/crop/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      setFormData({
        cropName: '',
        cropType: '',
        fieldLocation: '',
        soilType: '',
        plantingDate: '',
        estimatedHarvestDate: '',
        growthStage: '',
        healthStatus: '',
        cropImage: null,
      });
      navigate('/Allcrops');
    } catch (error) {
      console.error('Error adding crop:', error);
      setMessage('Failed to add crop.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Add New Crop</h1>

      {message && (
        <div className="mb-4 p-4 text-white bg-green-500 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropName">
            Crop Name
          </label>
          <input
            type="text"
            name="cropName"
            value={formData.cropName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter crop name"
          />
          {errors.cropName && <p className="text-red-500 text-xs italic">{errors.cropName}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropType">
            Crop Type
          </label>
          <input
            type="text"
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter crop type"
          />
          {errors.cropType && <p className="text-red-500 text-xs italic">{errors.cropType}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fieldLocation">
            Field Location
          </label>
          <input
            type="text"
            name="fieldLocation"
            value={formData.fieldLocation}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter field location"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="soilType">
            Soil Type
          </label>
          <input
            type="text"
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter soil type"
          />
          {errors.soilType && <p className="text-red-500 text-xs italic">{errors.soilType}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plantingDate">
            Planting Date
          </label>
          <input
            type="date"
            name="plantingDate"
            value={formData.plantingDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedHarvestDate">
            Estimated Harvest Date
          </label>
          <input
            type="date"
            name="estimatedHarvestDate"
            value={formData.estimatedHarvestDate}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.dates && <p className="text-red-500 text-xs italic">{errors.dates}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="growthStage">
            Growth Stage
          </label>
          <input
            type="text"
            name="growthStage"
            value={formData.growthStage}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter growth stage"
          />
          {errors.growthStage && <p className="text-red-500 text-xs italic">{errors.growthStage}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="healthStatus">
            Health Status
          </label>
          <input
            type="text"
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter health status"
          />
          {errors.healthStatus && <p className="text-red-500 text-xs italic">{errors.healthStatus}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropImage">
            Crop Image
          </label>
          <input
            type="file"
            name="cropImage"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.cropImage && <p className="text-red-500 text-xs italic">{errors.cropImage}</p>}
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            Add Crop
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCropForm;
