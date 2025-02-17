import mysql from 'mysql2'; // Import the mysql2 library
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Define the database connection pool configuration type
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.getConnection((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

export default db;  // Export the connection object for reuse
