const express = require('express');

const {
    getRecipes,
    getRecipesById,
    createRecipe,
    updateRecipe, 
    deleteRecipe
} = require('../controllers/recipeController');
//const { validateRecipe, upload } = require('../middleware/recipeMiddleware');

const router = express.Router();

// Get all recipes
router.get('/', getRecipes);

// Get a single recipe by ID
router.get('/:id', getRecipesById);

// Create a new recipe
router.post('/', createRecipe); // Changed the endpoint to '/' for consistency

// Update a recipe
router.put('/:id', updateRecipe); // Added upload and validate middleware

// Delete a recipe
router.delete('/:id', deleteRecipe);

module.exports = router;
