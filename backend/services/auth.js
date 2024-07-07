const { getUser } = require('./user');

function auth(req, res, next) {
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
    if (user===null) {
        res.status(401).json({ msg: "Unauthorized", success: false });
        return;
    }
    req.user = user;
    next();
}

module.exports = { auth }