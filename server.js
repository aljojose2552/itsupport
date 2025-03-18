const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");

dotenv.config();

const app = express();

// Middleware setup
app.use(cors({ origin: "http://localhost:3000" }));  // CORS setup for frontend
app.use(express.json());  // Middleware to parse JSON requests

// Routes
app.use("/api/auth", require("./routes/authRoutes"));  // Authentication routes
app.use("/api/tickets", require("./routes/ticketRoutes"));  // Ticket management routes

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
