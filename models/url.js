// models/url.js
const pool = require('../config/database');

const UrlModel = {
    createUrl: (originalUrl, shortUrl, expirationDate, callback) => {
        const query = 'INSERT INTO urls (original_url, short_url, hit_count, expiration_date) VALUES (?, ?, 0, ?)';
        pool.query(query, [originalUrl, shortUrl, expirationDate], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    },

    getUrlByShortUrl: (shortUrl, callback) => {
        const query = 'SELECT * FROM urls WHERE short_url = ? AND (expiration_date IS NULL OR expiration_date > NOW())';
        pool.query(query, [shortUrl], (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results[0]);
        });
    },

    incrementHitCount: (shortUrl, callback) => {
        const query = 'UPDATE urls SET hit_count = hit_count + 1 WHERE short_url = ?';
        pool.query(query, [shortUrl], callback);
    }
};

module.exports = UrlModel;
