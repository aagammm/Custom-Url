// handlers/urlHandler.js
const UrlModel = require('../models/url');

const UrlHandler = {
    createShortUrl: (req, res) => {
        const { originalUrl, customShortUrl, expirationDate } = req.body;

        if (!originalUrl) {
            return res.status(400).json({ error: 'originalUrl is required' });
        }

        const shortUrl = customShortUrl || Math.random().toString(36).substring(2, 8);

        UrlModel.createUrl(originalUrl, shortUrl, expirationDate, (error, results) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({ shortUrl });
        });
    },

    getOriginalUrl: (req, res) => {
        const { shortUrl } = req.params;

        UrlModel.getUrlByShortUrl(shortUrl, (error, url) => {
            if (error) {
                return res.status(500).json({ error: error.message });
            }
            if (!url) {
                return res.status(404).json({ message: 'URL not found or expired' });
            }
            UrlModel.incrementHitCount(shortUrl, (err) => {
                if (err) {
                    console.error('Error incrementing hit count:', err.message);
                }
            });
            res.redirect(url.original_url);
        });
    }
};

module.exports = UrlHandler;
