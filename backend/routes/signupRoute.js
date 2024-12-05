const express = require('express');
const bcrypt = require('bcrypt');
const axios = require('axios');
const validator = require('validator');

const app = express();
const User = require('../models/userModel');

app.post('/', async (req, res) => {
  try {
    const { username, phoneNumber, email, password, confirmPassword, city } = req.body;

    if (!email || !username || !password || !confirmPassword) {
      res.status(400).json({ msg: "Missing fields", success: false });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ msg: "Passwords do not match", success: false });
      return;
    }

    const response = await axios.get(`https://api.kickbox.com/v2/verify?email=${email}&apikey=live_5c838dfa686a082d0a5ed30b5ac7c66d347b4b2523e659006f99ff658e80733e`);
    if (response.data.result === 'undeliverable') {
      res.status(400).json({ msg: "Email not valid", success: false });
      return;
    }

    const exists = await User.findOne({ email });
    if (exists) {
      res.status(400).json({ msg: "User already exists", success: false });
      return;
    }

    const isValid = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });
    if (!isValid) {
      res.status(400).json({ msg: "Password not strong enough", success: false });
      return;
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      phoneNumber,
      email,
      isAdmin: false,
      password,//: hashedPassword,
      city
    });

    res.status(200).json({ msg: "User created successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", success: false });
  }
});

module.exports = app;
