const jwt = require('jsonwebtoken');

const setToken = (user) => {
  return jwt.sign({ user: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

const getUser = (token) => {
  try {
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = {
  setToken,
  getUser
}
