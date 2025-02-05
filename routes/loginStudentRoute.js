const express = require('express');
const db = require('../config/dbConfig');
const router = express.Router();

// Handle Signup Form Submission
router.post('/studentlogin', (req, res) => {
  const { email,password } = req.body;
 
  // Insert into MySQL
  const query = 'SELECT name FROM students WHERE email = ? AND password = ?';

db.query(query, [email, password], (err, result) => {
  if (err) {
    console.error(err);
    return res.status(500).send('Error fetching user from database.');
  }

  if (result.length === 0) {
    return res.status(404).send('User not found or incorrect password.');
  }

  // Send the user's name back as a response
  const userName = result[0].name;
  //console.log("User found: " + userName);
  res.send(`Welcome, ${userName}`);

  });
});

module.exports = router;
