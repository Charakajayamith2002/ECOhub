import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DiseaseResult = () => {
  const location = useLocation();
  const { result } = location.state || {};
  const navigate = useNavigate();

  const handleViewDetails = (scientificName) => {
    navigate('/disease-details', { state: { scientificName } });
  };

  return (
    <div className="w-1/2 mt-20 mb-20 mx-auto bg p-6 rounded-xl">
      {result ? (
        <div className="mt-6">
          <h2 className="text-4xl font-bold text-gray-800 text-center">Predicted Diseases</h2>
          {result.disease && result.disease.length > 0 ? (
            <div className="mt-10 space-y-6">
              {result.disease.map((disease, index) => (
                <div key={index} className="p-6 bg-white rounded-lg  transform transition-transform hover:scale-105"
                  style={{ boxShadow: '0 0px 5px rgba(0, 0, 0, 0.1), 0 0px 5px rgba(0, 0, 0, 0.1)' }}
                >
                  <h3 className="text-3xl font-bold mb-4  text-gray-700 text-center">{disease.name}</h3>
                  <p className="text-gray-600 text-center text-lg"><strong>Probability:</strong> {disease.probability.toFixed(2)}</p>
                  <p className="text-gray-600 text-center text-lg"><strong>Scientific Name:</strong> {disease.scientific_name}</p>
                  
                  {disease.similar_images && disease.similar_images.length > 0 ? (
                    <div>
                      <h4 className="mt-3 font-semibold text-gray-700 text-center text-lg">Similar Images:</h4>
                      <div className="flex justify-center space-x-4 mt-2">
                        {disease.similar_images.map((img, imgIndex) => (
                          <div key={imgIndex} className="rounded-lg overflow-hidden">
                            <img
                              src={img.url}
                              alt={`Similar ${imgIndex}`}
                              className="w-60 h-60 object-cover rounded-lg"
                            />
                            <p className="mt-2 text-sm text-gray-600 text-center">
                              <a href={img.url} target="_blank" rel="noopener noreferrer">Download</a>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No similar images available.</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No disease detected.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-6">No results available.</p>
      )}
    </div>
  );
};

export default DiseaseResult;
