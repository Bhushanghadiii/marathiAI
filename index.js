// index.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const HF_API_TOKEN = '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'; // 🔒 Paste your Hugging Face token

app.post('/vapi', async (req, res) => {
  const messages = req.body.messages || [];
  const userMessage = messages[messages.length - 1]?.content || 'तुमचं स्वागत आहे';

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/ai4bharat/indic-llama-marathi',
      { inputs: userMessage },
      {
        headers: {
          Authorization: `Bearer ${HF_API_TOKEN}`
        }
      }
    );

    const reply = response.data[0]?.generated_text || 'क्षमस्व, मला उत्तर देता आलं नाही.';

    res.json({
      message: {
        role: 'assistant',
        content: reply
      }
    });
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).send('AI4Bharat error');
  }
});

app.get('/', (req, res) => res.send('✅ Marathi Webhook for VAPI is running'));

app.listen(3000, () => console.log('🚀 Server running on port 3000'));
