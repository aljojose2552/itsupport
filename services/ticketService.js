import axios from 'axios';

// Define the base URL for your ticket API
const API_URL = "http://localhost:3001/api/tickets";

// Get all tickets (for admin and engineers)
const getAllTickets = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets", error);
    throw error;
  }
};

// Get user-specific tickets (for users)
const getUserTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user tickets", error);
    throw error;
  }
};

// Create a new ticket
const createTicket = async (title, description, priority) => {
  try {
    const response = await axios.post(
      API_URL,
      { title, description, priority },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating ticket", error);
    throw error;
  }
};

// Update a ticket (assign engineer or change status)
const updateTicket = async (ticketId, updates) => {
  try {
    const response = await axios.put(
      `${API_URL}/${ticketId}`,
      updates,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating ticket", error);
    throw error;
  }
};

// Delete a ticket
const deleteTicket = async (ticketId) => {
  try {
    const response = await axios.delete(`${API_URL}/${ticketId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting ticket", error);
    throw error;
  }
};

export default {
  getAllTickets,
  getUserTickets,
  createTicket,
  updateTicket,
  deleteTicket,
};
