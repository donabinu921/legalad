const express = require('express');
const { VertexAI } = require('@google-cloud/vertexai');

const app = express();
app.use(express.json());

// Initialize Vertex AI
const vertex_ai = new VertexAI({ 
  project: '101965346847', 
  location: 'us-central1' 
});
const model = 'projects/101965346847/locations/us-central1/endpoints/6271267978671554560';

const generativeModel = vertex_ai.preview.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 1,
    topP: 0.95,
  },
  safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE'
    }
  ],
  // Adding system instruction similar to previous Gemini implementation
  systemInstruction: "You are pretending to be a legal advisor. You will provide answers to queries based on the ruleset used in India. Do not answer vaguely. Give clear steps on how the user can proceed in that situation. Refer to yourself as legal advisor. Only provide the legal side of the queries."
});

const chat = generativeModel.startChat({});

app.post('/api/vertex', async (req, res) => {
  try {
    const { message } = req.body;
    const streamResult = await chat.sendMessageStream(message);
    const response = await streamResult.response;
    const content = response.candidates[0].content.parts[0].text;
    res.json({ content });
  } catch (error) {
    console.error("Vertex AI Error:", error);
    res.status(500).json({ error: "Failed to get response from Vertex AI" });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});