const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const dotenv = require("dotenv");

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is missing in .env file!");
}

// ✅ Function to Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// ✅ Register User
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 🔹 Validate Input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [name, email, hashedPassword, role || "User"];

    await db.promise().query(query, values);

    // 🔹 Generate JWT Token after Registration
    const user = { id: values.insertId, role: role || "User" };
    const token = generateToken(user);

    res.status(201).json({ message: "✅ User registered successfully!", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Login User
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Validate Input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const [users] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = users[0];

    // 🔹 Compare Password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔹 Generate JWT Token
    const token = generateToken(user);

    res.json({ message: "✅ Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
