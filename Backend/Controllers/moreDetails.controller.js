const { OpenAI } = require('openai');

// Initialize OpenAI client
const openai = new OpenAI();

const getDiseaseDetails = async (req, res) => {
  const { diseaseName } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: `What are the prevention methods and recommended fertilizers for ${diseaseName} on plants?` },
      ],
    });
    console.log(completion.choices[0].message);
    const details = response.choices[0].message.content;
    res.json({ details });
  } catch (error) {
    console.error('Error fetching details:', error);
    res.status(500).json({ error: 'Failed to fetch data from OpenAI API' });
  }
};

module.exports = { getDiseaseDetails };
