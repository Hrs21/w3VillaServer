const mongoose = require('mongoose');
require('dotenv').config();

// Database connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed', error.message);
    }
}

module.exports = connectDB;