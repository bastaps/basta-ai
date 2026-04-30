const axios = require('axios');

async function callMistral(messages, options = {}) {
  try {
    const response = await axios.post(
      'https://api.mistral.ai/v1/chat/completions',
      {
        model: process.env.MISTRAL_MODEL || 'mistral-large-latest',
        messages: messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.max_tokens || 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.MISTRAL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      throw new Error(`Mistral API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
    } else if (error.request) {
      throw new Error('Mistral API Network Error: No response received');
    } else {
      throw new Error(`Mistral API Request Error: ${error.message}`);
    }
  }
}

module.exports = { callMistral };