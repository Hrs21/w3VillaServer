const jwt = require('jsonwebtoken');
require("dotenv").config();

function authenticateUser(req, res, next) {
    try {
        const token = req.cookies.authToken; 
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.body.userId = decoded.userId; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
    }
}

module.exports = { authenticateUser };
