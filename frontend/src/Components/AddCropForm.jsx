import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddCropForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cropName: '',
    cropType: 'Seasonal', // Default value from enum
    fieldLocation: '',
    soilType: 'Loamy', // Default value from enum
    plantingDate: '',
    estimatedHarvestDate: '',
    growthStage: 'Seedling', // Default value from enum
    healthStatus: 'Healthy', // Default value from enum
    cropImage: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('');

  // Fetch user ID on component mount
  useEffect(() => {
    // Replace this with your actual authentication logic
    const fetchUserId = async () => {
      try {
        // Example: Get user from local storage or API
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user._id) {
          setUserId(user._id);
        } else {
          // Redirect to login if no user found
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setMessage('Please log in to add crops');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    fetchUserId();
  }, [navigate]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'cropImage') {
      setFormData((prev) => ({ ...prev, cropImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Validate form inputs based on the schema requirements
  const validate = () => {
    let errors = {};

    // Check for userId (required by schema)
    if (!userId) {
      errors.userId = 'User authentication required. Please log in again.';
    }

    // Required string fields
    if (!formData.cropName.trim()) {
      errors.cropName = 'Crop name is required.';
    }
    
    // Check enum fields match the schema's allowed values
    const validCropTypes = ['Seasonal', 'Perennial', 'Annual'];
    if (!validCropTypes.includes(formData.cropType)) {
      errors.cropType = 'Invalid crop type. Please select a valid option.';
    }
    
    if (!formData.fieldLocation.trim()) {
      errors.fieldLocation = 'Field location is required.';
    }
    
    const validSoilTypes = ['Sandy', 'Clay', 'Loamy'];
    if (!validSoilTypes.includes(formData.soilType)) {
      errors.soilType = 'Invalid soil type. Please select a valid option.';
    }
    
    const validGrowthStages = ['Seedling', 'Vegetative', 'Flowering', 'Maturity'];
    if (!validGrowthStages.includes(formData.growthStage)) {
      errors.growthStage = 'Invalid growth stage. Please select a valid option.';
    }
    
    const validHealthStatuses = ['Healthy', 'At-Risk', 'Infected'];
    if (!validHealthStatuses.includes(formData.healthStatus)) {
      errors.healthStatus = 'Invalid health status. Please select a valid option.';
    }
    
    // Required date fields
    if (!formData.plantingDate) {
      errors.plantingDate = 'Planting date is required.';
    }
    
    if (!formData.estimatedHarvestDate) {
      errors.estimatedHarvestDate = 'Estimated harvest date is required.';
    } else if (formData.plantingDate) {
      const plantingDate = new Date(formData.plantingDate);
      const estimatedHarvestDate = new Date(formData.estimatedHarvestDate);
      if (estimatedHarvestDate <= plantingDate) {
        errors.dates = 'Estimated harvest date must be after planting date.';
      }
    }

    // Image validation - required for cropImage.url in schema
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
    
    // Run validation before submitting
    if (!validate()) return;
    
    setLoading(true);
  
    // Prepare form data for submission
    const data = new FormData();
    data.append('userId', userId); // Use the actual userId from state
    
    // Append all required fields from the schema
    data.append('cropName', formData.cropName);
    data.append('cropType', formData.cropType);
    data.append('fieldLocation', formData.fieldLocation);
    data.append('soilType', formData.soilType);
    data.append('plantingDate', formData.plantingDate);
    data.append('estimatedHarvestDate', formData.estimatedHarvestDate);
    data.append('growthStage', formData.growthStage);
    data.append('healthStatus', formData.healthStatus);
    data.append('cropImage', formData.cropImage); // Backend should handle cloudinary upload
  
    try {
      // Sending data to the backend
      const response = await axios.post('http://localhost:4000/api/crop/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // For file upload
          Authorization: `Bearer ${localStorage.getItem('token')}` // Authentication
        },
      });
  
      // Handle success
      setMessage(response.data.message || 'Crop added successfully!');
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
  
      // Redirect to All crops page after brief delay
      setTimeout(() => navigate('/Allcrops'), 2000);
    } catch (error) {
      // Handle error response
      console.error('Error adding crop:', error);
      const errorMsg = error.response?.data?.message || 'Failed to add crop. Please try again.';
      setMessage(errorMsg);
      
      // Handle specific backend validation errors if returned
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };
  
  // If user authentication is missing, show message
  if (!userId && message) {
    return (
      <div className="max-w-4xl mx-auto my-8">
        <div className="mb-4 p-4 text-white bg-red-500 rounded">
          {message}
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-semibold text-center mb-6">Add New Crop</h1>

      {message && (
        <div className={`mb-4 p-4 text-white ${message.includes('Failed') || message.includes('Error') ? 'bg-red-500' : 'bg-green-500'} rounded`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {errors.userId && (
          <div className="mb-4 p-4 text-white bg-red-500 rounded">
            {errors.userId}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropName">
            Crop Name *
          </label>
          <input
            type="text"
            id="cropName"
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
            Crop Type *
          </label>
          <select
            id="cropType"
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Seasonal">Seasonal</option>
            <option value="Perennial">Perennial</option>
            <option value="Annual">Annual</option>
          </select>
          {errors.cropType && <p className="text-red-500 text-xs italic">{errors.cropType}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fieldLocation">
            Field Location *
          </label>
          <input
            type="text"
            id="fieldLocation"
            name="fieldLocation"
            value={formData.fieldLocation}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter field location (GPS coordinates or location name)"
          />
          {errors.fieldLocation && <p className="text-red-500 text-xs italic">{errors.fieldLocation}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="soilType">
            Soil Type *
          </label>
          <select
            id="soilType"
            name="soilType"
            value={formData.soilType}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Sandy">Sandy</option>
            <option value="Clay">Clay</option>
            <option value="Loamy">Loamy</option>
          </select>
          {errors.soilType && <p className="text-red-500 text-xs italic">{errors.soilType}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plantingDate">
              Planting Date *
            </label>
            <input
              type="date"
              id="plantingDate"
              name="plantingDate"
              value={formData.plantingDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.plantingDate && <p className="text-red-500 text-xs italic">{errors.plantingDate}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedHarvestDate">
              Estimated Harvest Date *
            </label>
            <input
              type="date"
              id="estimatedHarvestDate"
              name="estimatedHarvestDate"
              value={formData.estimatedHarvestDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.estimatedHarvestDate && <p className="text-red-500 text-xs italic">{errors.estimatedHarvestDate}</p>}
            {errors.dates && <p className="text-red-500 text-xs italic">{errors.dates}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="growthStage">
            Growth Stage *
          </label>
          <select
            id="growthStage"
            name="growthStage"
            value={formData.growthStage}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Seedling">Seedling</option>
            <option value="Vegetative">Vegetative</option>
            <option value="Flowering">Flowering</option>
            <option value="Maturity">Maturity</option>
          </select>
          {errors.growthStage && <p className="text-red-500 text-xs italic">{errors.growthStage}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="healthStatus">
            Health Status *
          </label>
          <select
            id="healthStatus"
            name="healthStatus"
            value={formData.healthStatus}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Healthy">Healthy</option>
            <option value="At-Risk">At-Risk</option>
            <option value="Infected">Infected</option>
          </select>
          {errors.healthStatus && <p className="text-red-500 text-xs italic">{errors.healthStatus}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropImage">
            Crop Image *
          </label>
          <input
            type="file"
            id="cropImage"
            name="cropImage"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.cropImage && <p className="text-red-500 text-xs italic">{errors.cropImage}</p>}
          <p className="text-xs text-gray-500 mt-1">This image will be uploaded to Cloudinary by the backend.</p>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          >
            {loading ? 'Adding Crop...' : 'Add Crop'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCropForm;