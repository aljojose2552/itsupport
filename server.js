const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./config/db");

dotenv.config();

const app = express();

// CORS setup for frontend
app.use(cors({ origin: "http://localhost:3000" }));

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
