require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Mount Mistral router
const mistralRouter = require('./routes/mistral');
app.use('/api', mistralRouter);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Basta AI running on http://localhost:${PORT}`);
});