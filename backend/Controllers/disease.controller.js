const dotenv = require('dotenv');
dotenv.config();

//create disease detect function
const detectDisease = async (req, res) => {
  try {
    const image = req.file;

    // Ensure image is provided
    if (!image || !image.buffer) {
      return res.status(400).json({ error: 'No image provided' });
    }

    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === 'cropImage') {
        const file = files[0];
        if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
          setErrors((prev) => ({ ...prev, cropImage: 'Only JPG and PNG files are allowed.' }));
        } else {
          setErrors((prev) => ({ ...prev, cropImage: null }));
          setFormData((prev) => ({ ...prev, cropImage: file }));
        }
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    };
    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    // Convert image buffer to Base64
    const base64Image = image.buffer.toString('base64');

    // Prepare data for API request
    const requestData = {
      images: [`data:image/jpeg;base64,${base64Image}`],
      similar_images: true
    };

    console.log('Sending request to API...');
    
    // Send request to Crop.Health API
    const response = await fetch('https://crop.kindwise.com/api/v1/identification', {
      method: 'POST',
      headers: {
        'Api-Key': process.env.CROP_HEALTH_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    // Debugging: Log all response headers
    console.log('Response Headers:', response.headers.raw());

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Request Failed: ${response.status} - ${errorText}`);
    }

    // Try getting the `Location` header
    const locationUrl = response.headers.get('location');
    if (!locationUrl) {
      console.warn('No Location header found, checking response body...');
      
      // Check if API directly returns results
      const responseData = await response.json();
      console.log('API Response Data:', responseData);

      if (responseData.result) {
        return res.json({
          disease: responseData.result.disease?.suggestions || [],
          crop: responseData.result.crop || 'Unknown crop'
        });
      }

      throw new Error('Location header not found, and no direct result returned');
    }

    console.log('Location URL:', locationUrl);

    // Make follow-up request to get the result
    const resultResponse = await fetch(locationUrl, {
      method: 'GET',
      headers: {
        'Api-Key': process.env.CROP_HEALTH_API_KEY
      }
    });

    if (!resultResponse.ok) {
      throw new Error(`Failed to retrieve results: ${resultResponse.status}`);
    }

    const resultData = await resultResponse.json();
    console.log('Final Disease Result:', resultData);

    // Extract disease information from resultData
    const diseaseSuggestions = resultData.result?.disease?.suggestions || [];
    const crop = resultData.result?.crop || 'Unknown crop';

    res.json({ disease: diseaseSuggestions, crop });
  } catch (error) {
    console.error('Error detecting disease:', error.message);
    res.status(500).json({ error: error.message || 'Failed to detect disease' }); //API error handling
  }
};

module.exports = { detectDisease };
