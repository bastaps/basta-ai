const express = require('express');
const router = express.Router();
const { callMistral } = require('../utils/mistralClient');

router.post('/chat', async (req, res) => {
  try {
    const { message, history, mode } = req.body;

    let systemPrompt = "You are Basta AI, a helpful AI development assistant.";
    if (mode === 'architect') {
      systemPrompt = "You are Basta AI, an expert software architect. Help the user design app structures, file trees, and README blueprints for AI-powered applications. Be precise, structured, and always output markdown.";
    } else if (mode === 'coder') {
      systemPrompt = "You are Basta AI, an expert full-stack developer. Generate clean, complete, production-ready code based on the user's specifications. Always explain what each file does.";
    } else if (mode === 'workflow') {
      systemPrompt = "You are Basta AI, a workflow consultant specializing in free AI development stacks. Guide the user through using Claude, Qwen, Mistral API, GitHub, and Laragon to build apps at zero cost.";
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ];

    const reply = await callMistral(messages);

    res.json({ reply, role: 'assistant' });
  } catch (error) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Mistral API error', detail: error.message });
  }
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok', app: 'Basta AI', version: '1.0.0' });
});

module.exports = router;