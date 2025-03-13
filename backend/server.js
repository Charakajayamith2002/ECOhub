require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Import cors
const { connectDB } = require('./DB/connectDB');

const crop = require("./routes/crop.js");



// Create express app
const app = express();

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Setup CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, 
}));


// Routes

//crop routes
app.use("/api/crop", crop);  