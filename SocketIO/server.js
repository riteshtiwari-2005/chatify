
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    "https://frontend-chatify-three.vercel.app",
    "http://localhost:5173",
    "http://localhost:3001"
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Store connected users
const users = {};

// Get receiver socket ID
const getReceiverSocketId = (receiverId) => {
    return users[receiverId];
};

// Listen for client connections
io.on("connection", (socket) => {
    console.log("A User Connected:", socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
        users[userId] = socket.id;
        console.log("Online users:", users);
    }

    // Send online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(users));

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A User Disconnected:", socket.id);

        // Avoid removing a newer connection for the same user
        if (userId && users[userId] === socket.id) {
            delete users[userId];
        }

        io.emit("getOnlineUsers", Object.keys(users));
    });
});

module.exports = {
    app,
    io,
    server,
    getReceiverSocketId
};
