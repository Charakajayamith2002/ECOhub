import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CropsDetails = () => {
  const { cropId } = useParams();
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/crop/crop/${cropId}`);
        console.log(response.data.crop); // Check the structure of the response here
        setCropDetails(response.data.crop);
      } catch (error) {
        setErrorMessage('Failed to fetch crop details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [cropId]);

  if (loading) {
    return (
      <div className="text-center p-6 text-lg font-semibold text-gray-500">Loading crop details...</div>
    );
  }

  if (errorMessage) {
    return (
      <div className="text-center p-6 text-red-600 text-lg font-semibold">{errorMessage}</div>
    );
  }

  if (!cropDetails) {
    return (
      <div className="text-center p-6 text-lg font-semibold text-gray-500">No crop found.</div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Title Section */}
        <div className="text-center mt-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">{cropDetails.cropName} Details</h2>
          <p className="text-lg text-gray-500 mb-6">Crop Information</p>
        </div>

        {/* Image and Information */}
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:w-1/2">
            <img
              src={cropDetails.cropImage.url}
              alt={cropDetails.cropName}
              className="w-full h-80 object-cover rounded-lg shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
            />
          </div>

          <div className="md:w-1/2">
            <div className="space-y-4">
              <p className="text-lg font-semibold text-gray-700">Field Location: <span className="font-normal">{cropDetails.fieldLocation}</span></p>
              <p className="text-lg font-semibold text-gray-700">Growth Stage: <span className="font-normal">{cropDetails.growthStage}</span></p>
              <p className="text-lg font-semibold text-gray-700">Crop Type: <span className="font-normal">{cropDetails.cropType}</span></p>
              <p className="text-lg font-semibold text-gray-700">Harvest Date: <span className="font-normal">{cropDetails.harvestDate}</span></p>
            </div>

            {/* Owner Info */}
            {cropDetails.userId && (
              <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-lg font-semibold text-gray-800">Owner Info:</p>
                <p className="text-lg text-gray-700">Name: {cropDetails.userId.name}</p>
                <p className="text-lg text-gray-700">Email: {cropDetails.userId.email}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropsDetails;
