import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DiseaseDetails = () => {
  const location = useLocation();
  const { scientificName } = location.state || {}; // Get scientificName from state
  const [diseaseDetails, setDiseaseDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDiseaseDetails = async (diseaseName) => {
    setLoading(true);
    setError(null);
    setDiseaseDetails(''); // Clear previous details

    try {
      const response = await axios.post('http://localhost:4000/api/more/more-details', {
        diseaseName: diseaseName,
      });

      setDiseaseDetails(response.data.details);
    } catch (error) {
      setError(error.response?.data?.error || 'Something went wrong.');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (scientificName) {
      fetchDiseaseDetails(scientificName);
    }
  }, [scientificName]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Disease Details</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {diseaseDetails && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-bold">Details for {scientificName}</h3>
          <p>{diseaseDetails}</p>
        </div>
      )}
      {!scientificName && <p>Please select a disease to view details.</p>}
    </div>
  );
};

export default DiseaseDetails;
