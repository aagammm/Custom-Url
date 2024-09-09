// app.js
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');

// Middleware to parse request bodies as JSON
app.use(express.json());

// Mount the authentication routes
app.use('/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
