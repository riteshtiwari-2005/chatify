
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db/connect");
const userRoute = require("./routes/user.route");
const messageRoute = require("./routes/message.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { app, server } = require("./SocketIO/server");

dotenv.config();

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URL;

// Allowed frontend origins
const allowedOrigins = [
  "https://frontend-chatify-three.vercel.app",
  "http://localhost:5173",
  "http://localhost:3001"
];
app.set("trust proxy", 1);
// Express CORS configuration
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

// Serve frontend only if it is included in this backend deployment
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "frontend/dist");

  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// Start server
const start = async () => {
  try {
    await connectDB(uri);

    server.listen(PORT, () => {
      console.log(`Chatify server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

start();
