const express = require('express');
const db = require('../config/dbConfig');
const router = express.Router();

// Handle Signup Form Submission
router.post('/signup', (req, res) => {
  const { name, email, phone,college,password } = req.body;

  // Insert into MySQL
  const query = 'INSERT INTO students (name, email, phoneno, college, password) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, email, phone, college, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving user to database.');
    }
    res.send('Registration successful! User saved to database.');
  });
});

module.exports = router;
