const express = require("express");
const pool = require("../config/dbConfig");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Add Course Route
router.post("/add/NewInternship", (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: "No image uploaded" });
    }

    const { name,branch,startDate,description } = req.body;
    const image = req.files.image;
    const sql = "INSERT INTO workshops (name,branch,startDate,description) VALUES (?, ?, ?, ?)";
    
    pool.query(sql, [name,branch,startDate,description], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const courseId = result.insertId;
        const uploadDir = path.join(__dirname, "../public/images/workshops", branch);
        const imagePath = path.join(uploadDir, `${courseId}.jpg`);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        image.mv(imagePath, (err) => {
            if (err) {
                return res.status(500).json({ error: "Image upload failed", details: err.message });
            }
            res.status(201).json({ message: "Internship added successfully", courseId, imagePath });
        });
    });
});

module.exports = router;
