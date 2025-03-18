const db = require("../config/db");

const createTicket = (ticketData, callback) => {
  const { userId, title, description, status } = ticketData;

  const query =
    "INSERT INTO tickets (user_id, title, description, status) VALUES (?, ?, ?, ?)";

  db.query(query, [userId, title, description, status], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const getTicketsByUserId = (userId, callback) => {
  const query = "SELECT * FROM tickets WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = { createTicket, getTicketsByUserId };
