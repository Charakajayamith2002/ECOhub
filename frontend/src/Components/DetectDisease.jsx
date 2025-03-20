import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('http://localhost:4000/api/disease/detect-disease', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      navigate('/diseaseResult', { state: { result: response.data } });
    } catch (err) {
      console.error('Error uploading file:', err);
      setError('Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-xl mt-20 Wrapper mb-40">
      <h1 className="text-3xl font-bold font-sans mb-6 text-center">Upload Image for Disease Detection</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-6">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
          >
            {file ? (
              <span className="text-gray-700">{file.name}</span>
            ) : (
              <span className="text-gray-500">Click to upload image</span>
            )}
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        <button
          type="submit"
          className={`w-full py-3 px-6 text-white font-semibold rounded-lg ${
            loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Upload and Detect'}
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
};

export default FileUpload;
