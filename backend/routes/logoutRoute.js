const express = require('express')
const app = express()

app.post('/', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
})

module.exports=app