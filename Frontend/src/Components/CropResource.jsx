import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CropResource = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/crop/all-crops'); // Adjust this URL to your backend route
        setCrops(response.data.crops);
      } catch (error) {
        setErrorMessage('Failed to fetch crops. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  const handleCardClick = (cropId) => {
    // Navigate to a detailed view for the clicked crop
    navigate(`/crop-details/${cropId}`);
  };

  if (loading) return <div>Loading crops...</div>;

  if (errorMessage) return <div>{errorMessage}</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Crops</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {crops.map(crop => (
          <div
            key={crop._id}
            className="border rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => handleCardClick(crop._id)}
          >
            <img src={crop.cropImage.url} alt={crop.cropName} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-xl">{crop.cropName}</h3>
        a      <p className="text-gray-700">Field: {crop.fieldLocation}</p>
              <p className="text-gray-600">Growth Stage: {crop.growthStage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropResource;
