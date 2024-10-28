/* const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this directory exists
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename with timestamp
    }
});

// Optional: File filter to allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png|gif/; // Allowed image formats
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed'));
    }
};

// Initialize multer with storage configuration and optional file filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: fileFilter
});

// Validation middleware for creating recipes
const validateRecipe = (req, res, next) => {
    const { name, ingredients, instructions } = req.body;

    if (!name || !ingredients || !instructions) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate ingredients as a comma-separated list
    if (!ingredients || ingredients.split(',').length === 0) {
        return res.status(400).json({ message: 'Ingredients should be a comma-separated list' });
    }

    next();
};

module.exports = {
    upload,
    validateRecipe
};
 */