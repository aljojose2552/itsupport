const express = require("express");
const { createTicket, getUserTickets } = require("../controllers/ticketController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to create a new ticket (auth required)
router.post("/create", authMiddleware, createTicket);

// Route to get all tickets of the logged-in user
router.get("/", authMiddleware, getUserTickets);

module.exports = router;
