// database.js
const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'aagamshah',
    password: 'Leo123!@#$%^&',
    database: 'aagam_servify',
    connectionLimit: 10,
});

module.exports = pool;


