const express = require("express");
const router = express.Router();
const db = require("../config/dbConfig"); // Adjust according to your project structure

router.post("/coursepayments", (req, res) => {
    const { email, courseName, phonenumber, transactionId, college, year, gender, qualification, price } = req.body;
    //console.log(req.body);

    if (!email || !courseName || !phonenumber) {
        return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const query = `
        INSERT INTO coursepayments (email, courseName, phonenumber, transactionId, college, year, gender, qualification, price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [email, courseName, phonenumber, transactionId, college, year, gender, qualification, price.slice(1)], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ success: false, message: "Database error." });
        }
        res.json({ success: true, message: "Payment recorded successfully." });
    });
});

module.exports = router;
