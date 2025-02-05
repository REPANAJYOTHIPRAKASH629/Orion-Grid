const mysql = require('mysql2');

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin123', // Update with your MySQL password
  database: 'oriongrid', // Update with your database name
});

// Connect to Database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

module.exports = db;
