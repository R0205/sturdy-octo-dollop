const express = require('express');
const path = require('path');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv').config();
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const Recipe = require('./models/Recipe');

const app = express();

// Connect to MongoDB
connectDB()
    .then(() => {
        console.log('Connected to MongoDB'.cyan.underline);
    })
    .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error.message}`.red);
        process.exit(1); // Exit the process with failure
    });

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies

// Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve static files from the uploads directory if needed
// Uncomment if using file uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sample route
app.get('/', (req, res) => {
    res.send("Recipe Recommendation App is running");
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);

// Fetch a single recipe by ID
app.get('/api/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }
        res.json({ success: true, data: recipe });
    } catch (error) {
        console.error('Error fetching recipe:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ success: false, message: err.message || 'Something went wrong!' });
});

// 404 Not Found Middleware
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`.yellow.bold);
});
