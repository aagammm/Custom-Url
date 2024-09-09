// routes/index.js
const express = require('express');
const UrlHandler = require('../handlers/urlHandler');
const AuthHandler = require('../handlers/authHandler'); // Add this line

const router = express.Router();

// Route to create a new short URL
router.post('/shorten', UrlHandler.createShortUrl);

// Route to get the original URL from the short URL
router.get('/:shortUrl', UrlHandler.getOriginalUrl);

// Route for user registration
router.post('/register', AuthHandler.register);

// Route for user login
router.post('/login', AuthHandler.login);

module.exports = router;
