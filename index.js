const express = require('express');
const http = require('http');  // for socket
const cors = require('cors');
const socketController = require('./controllers/socketController'); // Import the socket controller
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/mongo');
require('dotenv').config();

const app = express();
const server = http.createServer(app);   // Create HTTP server for socket

// CORS configuration for allowing the frontend to communicate with backend
const corsOptions = {
  origin: "http://localhost:5173", // Allow frontend from this origin
  methods: ["GET", "POST","PUT","PATCH"],
  allowedHeaders: ["Content-Type"]
};

app.use(cors(corsOptions)); // Enable CORS for all routes

// Initialize socket.io with the server
socketController.init(server);

// Middleware to parse JSON
app.use(express.json());

// Set up routes
app.use("/api/users/", userRoutes);

// Connect to the database (Uncomment to use)
const URI = process.env.MONGO_URI || "mongodb+srv://vatsal00:Dimple9@cluster0.cvuh3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// connectDB(URI);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
