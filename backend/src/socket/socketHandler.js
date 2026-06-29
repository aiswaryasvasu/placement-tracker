const { Server } = require('socket.io');

const initSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log(`⚡ User connected to notifications: ${socket.id}`);

        socket.on('join_user_channel', (userId) => {
            socket.join(userId);
            console.log(`👤 User joined channel: ${userId}`);
        });

        socket.on('disconnect', () => {
            console.log('❌ User disconnected from notification server');
        });
    });

    return io;
};

module.exports = initSocket;