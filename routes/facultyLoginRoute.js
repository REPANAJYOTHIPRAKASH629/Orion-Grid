const express = require('express');
const db = require('../config/dbConfig');
const router = express.Router();

// Handle Signup Form Submission
router.post('/facultylogin', (req, res) => {
  const { email,password } = req.body;
 
  // Insert into MySQL
  const query = 'SELECT name,courses FROM faculty WHERE email = ? AND password = ?';

db.query(query, [email, password], (err, result) => {
  if (err) {
    console.error(err);
    return res.status(500).send('Error fetching user from database.');
  }
  //console.log(result);
  if (result.length === 0) {
    return res.status(404).send('User not found or incorrect password.');
  }
  //console.log(result[0]);
  //console.log("User found: " + userName);
  res.send(result[0]);

  });
});

module.exports = router;
