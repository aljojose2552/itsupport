const ticketModel = require("../models/ticketModel");

// Create a ticket
exports.createTicket = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const userId = req.user.id; // Assuming `req.user` is populated by the auth middleware

  const newTicket = {
    userId,
    title,
    description,
    status: "Open", // Default status
  };

  ticketModel.createTicket(newTicket, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to create ticket", error: err });
    }
    res.status(201).json({ message: "Ticket created successfully", ticketId: results.insertId });
  });
};

// Get tickets for a user (to show them their submitted tickets)
exports.getUserTickets = (req, res) => {
  const userId = req.user.id; // Assuming `req.user` is populated by the auth middleware

  ticketModel.getTicketsByUserId(userId, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch tickets", error: err });
    }
    res.status(200).json({ tickets: results });
  });
};
