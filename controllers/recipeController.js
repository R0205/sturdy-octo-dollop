const mongoose = require('mongoose');
const Recipe = require('../models/Recipe');

// Get all recipes
const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        console.log(recipes); // Log the fetched recipes to check the data
        res.status(200).json({ success: true, data: recipes });
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching recipes', error: error.message });
    }
};

// Get a single recipe by ID
const getRecipesById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Recipe ID' });
    }

    try {
        const recipe = await Recipe.findById(id);
        if (!recipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        res.status(200).json({ success: true, data: recipe });
    } catch (error) {
        console.error('Error fetching recipe:', error.message);
        res.status(500).json({ success: false, message: 'Error fetching recipe', error: error.message });
    }
};

// Create a new recipe
const createRecipe = async (req, res) => {
    try {
        const { name, ingredients, instructions } = req.body;
        if (!name || !ingredients || !instructions) {
            return res.status(400).json({ success: false, message: 'Please provide all required fields' });
        }

        const newRecipe = { name, ingredients, instructions };
        const savedRecipe = await Recipe.create(newRecipe);

        res.status(201).json({ success: true, message: 'Recipe created successfully', data: savedRecipe });
    } catch (error) {
        console.error('Failed to create recipe:', error.message);
        res.status(500).json({ success: false, message: 'Failed to create recipe', error: error.message });
    }
};

// Update a recipe
const updateRecipe = async (req, res) => {
    const { id } = req.params;

    // Check for valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Recipe ID' });
    }

    const { name, ingredients, instructions } = req.body;
    if (!name || !ingredients || !instructions) {
        return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { name, ingredients, instructions },
            { new: true }
        );

        // Check if the recipe was found and updated
        if (!updatedRecipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        res.status(200).json({ success: true, message: 'Recipe updated successfully', data: updatedRecipe });
    } catch (error) {
        console.error('Error updating recipe:', error.message); // Improved logging
        res.status(500).json({ success: false, message: 'Error updating recipe', error: error.message });
    }
};


// Delete a recipe
const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Recipe ID' });
    }

    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        res.status(200).json({ success: true, message: 'Recipe deleted successfully' });
    } catch (error) {
        console.error('Error deleting recipe:', error.message);
        res.status(500).json({ success: false, message: 'Error deleting recipe', error: error.message });
    }
};

module.exports = {
    getRecipes,
    getRecipesById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
};
