require('dotenv').config();
const express = require('express');
const cors = require('cors');  // Import cors
const { connectDB } = require('./DB/connectDB');
const authRoutes = require('./routes/auth.route');
const diseaseRoute = require('./routes/disease.route');
const fertilizerRoutes = require('./routes/fertilizer.route');
const InventoryRoute = require('./routes/CommunityRoutes');
const { openAI } = require('openai');
const moredetailsRoute = require('./routes/moreDetails.route');


const crop = require("./routes/crop.js");


// Create express app
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));  // Increase limit as needed
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// app.use(cors());

//Setup CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, 
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/disease', diseaseRoute);
app.use('/api/products', fertilizerRoutes);
app.use("/community", InventoryRoute);
app.use('/api/more', moredetailsRoute);

app.use("/api/crop", crop);  














// Listen for requests
app.listen(process.env.PORT || 4000, () => {
  connectDB();
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});












