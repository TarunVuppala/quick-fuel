const { getUser } = require('./user');
const User = require('../models/userModel');
const DeliveryAgent = require('../models/deliveryAgentModel')
const Mechanic = require('../models/mechanic');

async function auth(req, res, next) {
    if (!req.headers.authorization || req.cookies.token) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
    if (!token) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    const user = getUser(token);
    if (user === null) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    const dbUser = await User.findById(user.user)
    if (!dbUser) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    req.user = user;
    next();
}

async function agentAuth(req, res, next) {
    if (!req.headers.authorization || req.cookies.token) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
    if (!token) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    const user = getUser(token);
    if (user === null) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    const dbUser = await DeliveryAgent.findById(user.user)
    if (!dbUser) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    req.user = user;
    next();
}

async function mechAuth(req, res, next) {
    if (!req.headers.authorization || req.cookies.token) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    const token = req.headers.authorization.split(" ")[1] || req.cookies.token;
    if (!token) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    const user = getUser(token);
    if (user === null) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    const dbUser = await Mechanic.findById(user.user)
    if (!dbUser) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    req.user = user;
    next();
}

module.exports = { auth, agentAuth, mechAuth }