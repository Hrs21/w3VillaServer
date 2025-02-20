const express = require('express');
const { signup, login } = require("../controller/auth"); // Import controllers

const router = express.Router();

// Signup Route
router.post('/auth/signup', signup);

// Login Route
router.post('/auth/login', login);

module.exports = router;
