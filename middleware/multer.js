/* const multer = require('multer');
const path = require('path');
const axios = require('axios');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './backend/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage });

//Validation middleware for creating recipes
const validateRecipe = (req, res, next) => {
    const { name, ingredients, instructions } = req.body;

    // 

    if (!name || !ingredients || !instructions) {
        return res.status(400).json({ message: 'All fields are required' });
    }

     // Validate ingredients as a comma-separated list
     if (!ingredients || ingredients.split(',').length === 0) {
        return res.status(400).json({ message: 'Ingredients should be a comma-separated list' });
    }

    next();
};

/* const createRecipe = async (formData, token) => {
    return await axios.post('http://localhost:8000/api/recipes', formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Ensure this header is set
        },
    });
}; */



/* module.exports = {
    validateRecipe,
    upload
}  */