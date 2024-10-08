const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios');
const validator = require('validator');

const app = express();
const Mechanic = require('../models/mechanic');
const VehicleRepairOrder = require('../models/vehicleRepairModel');
const { setToken, getUser } = require('../services/user');
const { mechAuth } = require('../services/auth');

// Middleware to parse JSON bodies
app.use(express.json());

// Utility function to extract token
const extractToken = (req) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) return null;
  const parts = authorizationHeader.split(" ");
  return parts.length === 2 ? parts[1] : null;
};

app.get('/', mechAuth, async (req, res) => {
  try {
    const orders = await VehicleRepairOrder.find({ mechanic: req.user.user });
    res.status(200).json({ orders, msg: "Mechanic authenticated successfully", success: true });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

// Signup route for mechanic
app.post('/signup', async (req, res) => {
  try {
    const { username, phoneNumber, email, password, city, specialty } = req.body;

    // Validate required fields
    if (!username || !phoneNumber || !email || !password || !city || !specialty) {
      return res.status(400).json({ msg: "Missing fields", success: false });
    }

    // Validate email format using Kickbox API
    // const response = await axios.get(`https://api.kickbox.com/v2/verify?email=${email}&apikey=${process.env.KICKBOX_API_KEY}`);
    // if (response.data.result === 'undeliverable') {
    //   return res.status(400).json({ msg: "Invalid email address", success: false });
    // }

    // Check if user with the same email already exists
    const existingUser = await Mechanic.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists", success: false });
    }

    // Validate password strength
    const isValidPassword = validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 });
    if (!isValidPassword) {
      return res.status(400).json({ msg: "Password not strong enough", success: false });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new mechanic
    const newMechanic = await Mechanic.create({
      username,
      phoneNumber,
      email,
      password: hashedPassword,
      city,
      specialty
    });

    // Generate JWT token
    const token = setToken(newMechanic);

    // Respond with success message and token
    res.status(200).json({ user: newMechanic, token, msg: "Mechanic created successfully", success: true });
  } catch (error) {
    console.error("Error signing up mechanic:", error);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

// Login route for mechanic
app.post('/login', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    // Validate input fields
    if (!phoneNumber || !password) {
      return res.status(400).json({ msg: "Missing fields", success: false });
    }

    // Find mechanic by phoneNumber
    const mechanic = await Mechanic.findOne({ phoneNumber });

    // Check if mechanic exists
    if (!mechanic) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    // Compare passwords
    // const isPasswordMatch = await bcrypt.compare(password, mechanic.password);
    if (password !== mechanic.password) {//!isPasswordMatch
      return res.status(401).json({ msg: "Incorrect password", success: false });
    }

    // Generate JWT token
    const token = setToken(mechanic);

    mechanic.online = true;
    await mechanic.save();

    // Respond with success message and token
    res.status(200).json({ user: mechanic, token, msg: "Login successful", success: true });
  } catch (error) {
    console.error("Error logging in mechanic:", error);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

app.post('/logout', async (req, res) => {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized", success: false });
  }

  const payload = getUser(token);
  if (!payload) {
    return res.status(401).json({ msg: "Unauthorized", success: false });
  }

  try {
    const user = await Mechanic.findById(payload.user);
    user.online = false;
    await user.save();

    res.clearCookie('token');
    res.status(200).json({ msg: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Error logging out mechanic:", error);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

app.post('/verify', mechAuth, (req, res) => {
  res.status(200).json({ success: true });
});

module.exports = app;
