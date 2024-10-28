const mongoose = require('mongoose');

const Recipe = require('./models/Recipe');
const connectDB = require('./config/db');

// sample Indian recipes

//Load enviorment variables
require('dotenv').config({path:'../.env'});

const indianRecipes = [
    {
        name: 'Butter Chicken',
        ingredients: [
            '500g chicken',
            '100g butter',
            '200ml tomato puree',
            '100ml cream',
            'Spices: garam masala, coriander powder, red chili powder, salt',
        ],
        instructions: 'Cook chicken with butter, add tomato puree, and simmer with cream and spices.',
        imageUrl:'http://localhost:8000/uploads/images/butterChicken.jpg',
    },
    {
        name: 'Paneer Tikka',
        ingredients: [
            '250g paneer',
            '100g yogurt',
            'Spices: turmeric, red chili powder, garam masala, salt',
            'Vegetables: bell pepper, onion',
        ],
        instructions: 'Marinate paneer and vegetables in yogurt and spices, then grill until golden brown.',

        imageUrl:'http://localhost:8000/uploads/images/paneertikka.jpg'},

    {
        name: 'Chole Bhature',
        ingredients: [
            '200g chickpeas',
            '2 cups all-purpose flour',
            'Spices: garam masala, cumin seeds, turmeric, red chili powder, salt',
            '1 onion, 2 tomatoes, 2 green chilies',
            'Oil for frying',
        ],
        instructions: 'Prepare chickpea curry with spices and serve with deep-fried bread made from flour.',

        imageUrl:'http://localhost:8000/uploads/images/chollebhature.jpg', // Replace with an actual image URL
    },
    {
        name: 'Masala Dosa',
        ingredients: [
            '2 cups rice',
            '1 cup split black lentils (urad dal)',
            '4 boiled potatoes',
            'Spices: mustard seeds, turmeric, salt, red chili powder',
            'Oil for cooking',
        ],
        instructions: 'Make a fermented rice and lentil batter. Prepare the potato masala filling and cook dosas.',

        imageUrl:'http://localhost:8000/uploads/images/Masala Dosa.jpg', // Replace with an actual image URL
    },
    {
        name: 'Biryani',
        ingredients: [
            '500g basmati rice',
            '300g chicken or lamb',
            'Spices: bay leaves, cardamom, cinnamon, cloves, saffron',
            '1 onion, 1 tomato, 1 cup yogurt',
            'Oil for cooking',
        ],
        instructions: 'Layer cooked rice and marinated meat with spices and bake. Serve with raita.',

        imageUrl:'http://localhost:8000/uploads/images/Biryani.jpg', // Replace with an actual image URL
    },
    {
        name: 'Palak Paneer',
        ingredients: [
            '200g paneer',
            '300g spinach',
            'Spices: cumin seeds, turmeric, garam masala, red chili powder, salt',
            '1 onion, 2 tomatoes',
            '2 tablespoons cream',
        ],
        instructions: 'Blanch spinach, make a puree, and cook with spices and paneer cubes.',

        imageUrl:'http://localhost:8000/uploads/images/Palak Paneer.jpg'
    },
    {
        name: 'Aloo Paratha',
        ingredients: [
            '2 cups whole wheat flour',
            '2 boiled potatoes',
            'Spices: garam masala, red chili powder, salt, cumin seeds',
            'Oil or ghee for cooking',
        ],
        instructions: 'Prepare dough and potato filling. Roll parathas and cook on a griddle with ghee.',

        imageUrl:'http://localhost:8000/uploads/images/Aloo Paratha.jpg' // Replace with an actual image URL
    },
    {
        name: 'Gulab Jamun',
        ingredients: [
            '1 cup milk powder',
            '1/4 cup all-purpose flour',
            '2 tablespoons ghee',
            '1/4 cup milk',
            'Sugar syrup flavored with cardamom and rose water',
        ],
        instructions: 'Make dough with milk powder, form balls, fry, and soak in sugar syrup.',

        imageUrl:'http://localhost:8000/uploads/images/Gulab Jamun.jpg', // Replace with an actual image URL
    },
    {
        name: 'Samosa',
        ingredients: [
            '2 cups all-purpose flour',
            '3 boiled potatoes',
            'Spices: cumin seeds, coriander powder, garam masala, salt',
            'Oil for frying',
            '1 cup peas',
        ],
        instructions: 'Make dough and filling with spiced potatoes and peas. Form samosas and deep fry.',

        imageUrl:'http://localhost:8000/uploads/images/Samosa.jpg', // Replace with an actual image URL
    },
];

//seed fundtion to populate the database

const seedDB = async () => {
    try {
        await Recipe.deleteMany({});
        await Recipe.insertMany(indianRecipes);

        console.log('Database seeded with indian recipes');

    } catch (err) {
        console.error('Error seeding the database:', err);
    }
    finally {
        mongoose.connection.close(); // Close the database connection
    }
};

const startSeeding = async()=>{
    connectDB();
    await seedDB();

};

startSeeding();
