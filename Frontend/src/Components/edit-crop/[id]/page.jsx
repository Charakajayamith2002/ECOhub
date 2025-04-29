import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCrop = () => {
  // Add animation for the pop-up
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes bounceIn {
      0% {
        opacity: 0;
        transform: scale(0.8);
      }
      50% {
        opacity: 1;
        transform: scale(1.05);
      }
      70% { transform: scale(0.95); }
      100% { transform: scale(1); }
    }
    .animate-bounce-in {
      animation: bounceIn 0.5s ease-out;
    }
  `;
  document.head.appendChild(style);
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/crop/crop/${id}`);
        setCrop(response.data.crop);
      } catch (error) {
        setErrorMessage('Error fetching crop data. Please try again.');
        setShowNotification(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCrop();
  }, [id]);

  const handleChange = (e) => {
    setCrop({
      ...crop,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    // Validation check
    if (!crop.cropName || !crop.fieldLocation || !crop.plantingDate || !crop.estimatedHarvestDate) {
      setErrorMessage('Please fill all required fields.');
      setSuccessMessage('');
      setShowNotification(true);
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('cropName', crop.cropName);
    formData.append('cropType', crop.cropType);
    formData.append('fieldLocation', crop.fieldLocation);
    formData.append('plantingDate', new Date(crop.plantingDate).toISOString());
    formData.append('estimatedHarvestDate', new Date(crop.estimatedHarvestDate).toISOString());
    formData.append('soilType', crop.soilType);
    formData.append('growthStage', crop.growthStage);
    formData.append('healthStatus', crop.healthStatus);
  
    if (newImage) {
      formData.append('cropImage', newImage);
    }
  
    try {
      const response = await axios.put(`http://localhost:4000/api/crop/edit-crops/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.success) {
        setErrorMessage('');
        setSuccessMessage('Crop updated successfully!');
        setShowNotification(true);
      } else {
        setSuccessMessage('');
        setErrorMessage(response.data.message || 'Error updating crop.');
        setShowNotification(true);
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Failed to update crop. Please try again.');
      setShowNotification(true);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
  };

  if (loading && !crop) return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
    </div>
  );

  if (!crop) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
        <p className="font-bold">Error</p>
        <p>No crop data found!</p>
      </div>
    </div>
  );

  return (
    <div className="mt-32">
      {/* Popup notification */}
      {showNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowNotification(false)}
          ></div>
          
          {/* Popup message */}
          <div className={`relative px-8 py-6 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out 
            ${successMessage ? 'bg-white border-t-4 border-green-500' : 'bg-white border-t-4 border-red-500'} 
            max-w-md w-full mx-4 animate-bounce-in`}>
            
            <div className="flex items-center justify-center mb-4">
              {successMessage ? (
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
                  <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              ) : (
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
                  <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
            
            <div className="text-center">
              <h3 className={`text-lg font-medium mb-2 ${successMessage ? 'text-green-800' : 'text-red-800'}`}>
                {successMessage ? 'Success!' : 'Error!'}
              </h3>
              <p className="text-gray-700 mb-6">
                {successMessage || errorMessage}
              </p>
              
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setShowNotification(false);
                    if (successMessage) {
                      navigate('/Allcrops');
                    }
                  }}
                  className={`inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white 
                    ${successMessage ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 ${successMessage ? 'focus:ring-green-500' : 'focus:ring-red-500'}`}
                >
                  {successMessage ? 'Go to Crops List' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-6 mb-40 mt-10 max-w-3xl bg-white shadow-lg rounded-lg">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Crop</h2>
          <p className="text-gray-600 mt-1">Update your crop information below</p>
        </div>
        
        <form onSubmit={handleUpdate} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropName">Crop Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="cropName"
              name="cropName"
              value={crop.cropName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-200 focus:border-green-500"
              placeholder="Enter crop name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropType">Crop Type</label>
            <select
              id="cropType"
              name="cropType"
              value={crop.cropType}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-200 focus:border-green-500"
            >
              <option value="Seasonal">Seasonal</option>
              <option value="Perennial">Perennial</option>
              <option value="Annual">Annual</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fieldLocation">Field Location <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="fieldLocation"
              name="fieldLocation"
              value={crop.fieldLocation}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-200 focus:border-green-500"
              placeholder="Enter field location"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="plantingDate">Planting Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                id="plantingDate"
                name="plantingDate"
                value={formatDate(crop.plantingDate)}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-200 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="estimatedHarvestDate">Estimated Harvest Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                id="estimatedHarvestDate"
                name="estimatedHarvestDate"
                value={formatDate(crop.estimatedHarvestDate)}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-200 focus:border-green-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="soilType">Soil Type</label>
              <select
                id="soilType"
                name="soilType"
                value={crop.soilType}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-200 focus:border-green-500"
              >
                <option value="Sandy">Sandy</option>
                <option value="Clay">Clay</option>
                <option value="Loamy">Loamy</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="growthStage">Growth Stage</label>
              <select
                id="growthStage"
                name="growthStage"
                value={crop.growthStage}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-200 focus:border-green-500"
              >
                <option value="Seedling">Seedling</option>
                <option value="Vegetative">Vegetative</option>
                <option value="Flowering">Flowering</option>
                <option value="Maturity">Maturity</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="healthStatus">Health Status</label>
              <select
                id="healthStatus"
                name="healthStatus"
                value={crop.healthStatus}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-green-200 focus:border-green-500"
              >
                <option value="Healthy">Healthy</option>
                <option value="At-Risk">At-Risk</option>
                <option value="Infected">Infected</option>
              </select>
            </div>
          </div>

          <div className="border p-4 rounded-lg bg-gray-50">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cropImage">Crop Image</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-100 hover:border-green-500 cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-500 group-hover:text-gray-600">
                    {newImage ? newImage.name : "Click to upload a new image"}
                  </p>
                </div>
                <input 
                  type="file" 
                  id="cropImage"
                  name="cropImage"
                  onChange={handleImageChange}
                  className="opacity-0" 
                />
              </label>
            </div>
            
            <div className="mt-4 flex justify-center">
              {imagePreview ? (
                <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 transition-all">
                  <img src={imagePreview} alt="Preview" className="object-cover h-48 w-auto" />
                  <button 
                    type="button"
                    onClick={() => {
                      setNewImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 focus:outline-none"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : crop.cropImage && (
                <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 transition-all">
                  <img 
                    src={crop.cropImage.url} 
                    alt="Current Image" 
                    className="object-cover h-48 w-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 text-center">
                    Current Image
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between mt-8 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/Allcrops')}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                  Update Crop
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCrop;