// routes/auth.js
const express = require('express');
const router = express.Router();
const AuthHandler = require('../handlers/authHandler');

// Route to handle user registration
router.post('/register', AuthHandler.register);

// Route to handle user login
router.post('/login', AuthHandler.login);

module.exports = router;
