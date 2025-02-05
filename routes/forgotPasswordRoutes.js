const express = require('express');
const db = require('../config/dbConfig');
const router = express.Router();

// Handle Signup Form Submission
router.post('/change', (req, res) => {
  const { email,newPassword } = req.body;

  // Insert into MySQL
  const query = 'UPDATE students SET password = ? WHERE email = ?';
  db.query(query, [newPassword,email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error saving user to database.');
    }
    console.log("User password changed successfully");
    res.send('Registration successful! User saved to database.');
  });
});

module.exports = router;
