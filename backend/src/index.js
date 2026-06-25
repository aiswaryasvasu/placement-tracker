const express = require('express');
const connectDB = require('./config/db');

const app = express();

// 1. Fire up the database connection
connectDB();

// 2. Middleware to parse incoming JSON data from APIs
app.use(express.json());

// 3. Simple test route for Person 1 & Person 2 to ensure server is alive
app.get('/', (req, res) => {
    res.send('Placement Tracker API is running...');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is cruising on port ${PORT}`);
});

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);