const express = require("express");
const pool = require("../config/dbConfig");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Add Course Route
router.post("/add", (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: "No image uploaded" });
    }

    const { title, description, branch, price, syllabus } = req.body;
    const image = req.files.image;

    const sql = "INSERT INTO courses (title, description, branch, price, syllabus) VALUES (?, ?, ?, ?, ?)";
    
    pool.query(sql, [title, description, branch, price, syllabus], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const courseId = result.insertId;
        const uploadDir = path.join(__dirname, "../public/images/courses", branch);
        const imagePath = path.join(uploadDir, `${courseId}.jpg`);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        image.mv(imagePath, (err) => {
            if (err) {
                return res.status(500).json({ error: "Image upload failed", details: err.message });
            }

            res.status(201).json({ message: "Course added successfully", courseId, imagePath });
        });
    });
});

module.exports = router;
