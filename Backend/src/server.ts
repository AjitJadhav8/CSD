import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import https from 'https';
import path from 'path';

// Import routes and database connection
import orgRoutes from './routes/orgRoutes';
import db from './config/db';


dotenv.config(); // Load environment variables

const app = express(); // Initialize app

// Middleware
app.use(express.json()); // Use express built-in JSON parser instead of bodyParser
app.use(cors());

// Use the routes
app.use('/api', orgRoutes);

// Keep-alive agent for HTTPS
https.globalAgent = new https.Agent({ keepAlive: true });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
