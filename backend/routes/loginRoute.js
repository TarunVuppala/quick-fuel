const express = require('express');
const app = express();
const User = require('../models/userModel');
const { setToken } = require('../services/user');

app.post('/', async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      res.status(400).json({ msg: "Missing fields", success: false });
      return;
    }

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      res.status(404).json({ msg: "User not found", success: false });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ msg: "Wrong password", success: false });
      return;
    }

    const token = setToken(user);
    res.status(200).json({ token, msg: "Login success", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

module.exports = app;
