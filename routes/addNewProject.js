const express = require("express");
const pool = require("../config/dbConfig");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Add Course Route
router.post("/addNewInternship", (req, res) => {
    // console.log(req.files.image);
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: "No image uploaded" });
    }

    const { projectTitle,price,branch,abstract } = req.body;
    const image = req.files.image;
    const sql = "INSERT INTO projects (projectTitle,price,branch,abstract) VALUES (?, ?, ?, ?)";
    
    pool.query(sql, [projectTitle,price,branch,abstract], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const courseId = result.insertId;
        const uploadDir = path.join(__dirname, "../public/images/projects", branch);
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
