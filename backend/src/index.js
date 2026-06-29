require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors'); // <-- Add this line
const connectDB = require('./config/db');
const initSocket = require('./socket/socketHandler');

const app = express();

// 1. Database Hook 
connectDB();

// 2. Parsers Middleware
app.use(cors({
  origin: "http://localhost:5173", // or your React port
  credentials: true
})); // <-- Add this line right here to unblock the frontend!
app.use(express.json());

// 3. Mount Routers
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('Placement Tracker API is running...');
});

// 4. Bind HTTP and Real-Time WebSockets Engine
const server = http.createServer(app);
const io = initSocket(server);
app.set('io', io);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is cruising on port ${PORT} with WebSockets active!`);
});