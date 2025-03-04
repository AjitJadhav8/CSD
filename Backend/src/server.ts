import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import https from 'https';

// Import routes and database connection
import orgRoutes from './routes/orgRoutes';
import authRoutes from './routes/authRoutes'; // Import auth routes
import timesheetRoutes from './routes/timesheetRoutes';
import rmgRoutes from './routes/rmgRoutes';

dotenv.config(); // Load environment variables

const app = express(); // Initialize app

// Middleware
app.use(express.json()); // Use express built-in JSON parser instead of bodyParser
app.use(cors());

// Use the routes
app.use('/api', orgRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/timesheet', timesheetRoutes);
app.use('/api/rmg', rmgRoutes);



// Keep-alive agent for HTTPS
https.globalAgent = new https.Agent({ keepAlive: true });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
