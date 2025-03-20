const dotenv = require('dotenv');
dotenv.config();

const detectDisease = async (req, res) => {
  const image = req.file;

  // Dynamically import node-fetch
  const fetch = (await import('node-fetch')).default;

  // Convert image buffer to Base64
  const base64Image = image.buffer.toString('base64');

  // Prepare data for API request
  const requestData = {
    images: [`data:image/jpeg;base64,${base64Image}`],
    similar_images: true
  };

  console.log('Request Data:', requestData);

  try {
    // Send request to Crop.Health API
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Api-Key': process.env.CROP_HEALTH_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData)
    });

    // Check for the Location header
    const locationUrl = response.headers.get('location');
    if (!locationUrl) {
      throw new Error('Location header not found in response');
    }

    console.log('Location URL:', locationUrl);

    // Make follow-up request to get the result
    const resultResponse = await fetch(locationUrl, {
      method: 'GET',
      headers: {
        'Api-Key': process.env.CROP_HEALTH_API_KEY
      }
    });

    const resultData = await resultResponse.json();
    console.log('Result Data:', resultData);

    // Extract disease information from resultData
    const diseaseSuggestions = resultData.result.disease?.suggestions || [];
    const disease = diseaseSuggestions;
    const crop = resultData.result.crop || 'Unknown crop';  // Extract crop information

    // Respond with disease information
    res.json({ disease, crop });
  } catch (error) {
    console.error('Error detecting disease:', error);
    res.status(500).json({ error: 'Failed to detect disease' });
  }
};

module.exports = { detectDisease };
