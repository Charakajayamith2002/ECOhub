require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./DB/connectDB');  // Make sure this file exists and is correctly implemented
const authRoutes = require('./routes/auth.route');






// Create express app
const app = express();

// Middleware
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded

// Setup CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
  credentials: true,  // Allow cookies to be sent
}));

// Routes
app.use('/api/auth', authRoutes);




// Connect to the database
connectDB();  // Function to connect to your database (ensure this is defined and implemented properly)

// Start the server
const port = process.env.PORT || 4000;  // Default port 5000 or from .env file
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);  // Corrected line with backticks
});
