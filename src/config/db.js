const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // 'placement_tracker' will be the name of your local database
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/placement_tracker');
        console.log(`🚀 MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1); // Stop the server if the database fails to connect
    }
};

module.exports = connectDB;