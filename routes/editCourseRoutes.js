const express = require("express");
const pool = require("../config/dbConfig");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// Get all courses
router.get("/", (req, res) => {
    pool.query("SELECT * FROM courses", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Update a course price
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { price } = req.body;
    
    pool.query("UPDATE courses SET price = ? WHERE id = ?", [price, id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Course updated successfully" });
    });
});

// Update course image
router.put("/:id/image", (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: "No image uploaded" });
    }

    const { id } = req.params;
    const image = req.files.image;

    pool.query("SELECT branch FROM courses WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Course not found" });

        const branch = results[0].branch;
        const uploadDir = path.join(__dirname, `..public/courses/${branch}`);
        const imagePath = path.join(uploadDir, `${id}.jpg`);

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        image.mv(imagePath, (err) => {
            if (err) return res.status(500).json({ error: "Image upload failed" });

            res.json({ message: "Image updated successfully", imagePath });
        });
    });
});

// Delete a course
router.delete("/:id", (req, res) => {
    const { id } = req.params;

    pool.query("SELECT branch FROM courses WHERE id = ?", [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Course not found" });

        const branch = results[0].branch;
        const imagePath = path.join(__dirname, `..public/images/courses/${branch}/${id}.jpg`);

        pool.query("DELETE FROM courses WHERE id = ?", [id], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            fs.unlink(imagePath, (err) => {
                if (err && err.code !== "ENOENT") return res.status(500).json({ error: "Error deleting image" });
                res.json({ message: "Course deleted successfully" });
            });
        });
    });
});

module.exports = router;
