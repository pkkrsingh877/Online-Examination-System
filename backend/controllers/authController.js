const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Route to verify token and get user info
exports.verifyJwt = async (req, res) => {
    try {
        // Assuming the token has user ID, you can fetch user data from the database
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password from the user object

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the user is found and token is valid, return user data
        res.status(201).json({ user: { id: req.user.userId, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Controller for user signup
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ username, email, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '30d',
        });

        res.status(201).json({ token, user: { id: user._id, username, email } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error during signup', error });
    }
};

// Controller for user login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '30d',
        });

        res.status(200).json({ token, user: { id: user._id, username: user.username, email } });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error });
    }
};
