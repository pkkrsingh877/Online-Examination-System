const express = require('express');
const { signup, login, verifyJwt } = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const router = express.Router();


const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from 'Bearer token'

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret'); // Verify the token with your JWT_SECRET
        req.user = decoded; // decoded will contain the user info encoded in the JWT
        next();
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Invalid token' });
    }
};

//Verify JWT
router.get('/me', verifyToken, verifyJwt);

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

module.exports = router;
