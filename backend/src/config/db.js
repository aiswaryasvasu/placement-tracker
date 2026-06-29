const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // This forces it to read the MONGO_URI string from your .env file
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`🚀 Database Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Database Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;