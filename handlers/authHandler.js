// handlers/authHandler.js
const bcrypt = require('bcrypt');
const pool = require('../config/database');

const AuthHandler = {
    register: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            pool.query(query, [username, hash], (error, results) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                res.status(201).json({ message: 'User registered' });
            });
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const query = 'SELECT * FROM users WHERE username = ?';
        pool.query(query, [username], (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            const user = results[0];
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }

                if (!result) {
                    return res.status(401).json({ error: 'Invalid username or password' });
                }

                // You may want to generate and send a JWT token for authenticated users here
                res.status(200).json({ message: 'Login successful' });
            });
        });
    }
};

module.exports = AuthHandler;
