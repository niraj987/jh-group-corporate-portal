import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'JH Group Backend API',
    mongoConnected: mongoose.connection.readyState === 1,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Optional MongoDB Connection with graceful fallback
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log('✓ Successfully connected to MongoDB'))
    .catch((err) => {
      console.warn('! MongoDB connection error. Operating with local resilient file backup:', err.message);
    });
} else {
  console.log('ℹ No MONGO_URI specified. Contacts will be safely saved in server/data/contacts.json.');
}

// Start Server
app.listen(PORT, () => {
  console.log(`✓ JH Group Express Server is running on http://localhost:${PORT}`);
  console.log(`✓ API endpoints available at http://localhost:${PORT}/api/ecosystem, /api/contact, /api/metrics`);
});
