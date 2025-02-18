const bcrypt = require('bcrypt');
const {User} = require('../models/user'); 
const jwt = require('jsonwebtoken');

// Signup Controller
async function signup(req, res) {

    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({success:false, message: 'User already exists' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({success:true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ success:false, message: 'Internal server error', error: error.message });
    }
}

async function login(req, res) {

    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({success:false, message: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({success:false, message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
             process.env.SECRET_KEY, 
            { expiresIn: '1h' });

        // Set cookie with token
        res.cookie('authToken', token, { httpOnly: true, secure: false });

        res.status(200).json({success:true, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({succss:false, message: 'Internal server error', error: error.message });
    }
}


module.exports = { signup, login };