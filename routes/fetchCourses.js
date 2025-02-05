const express = require('express');
const db = require('../config/dbConfig');
const router=express.Router();

// Fetch courses from database
router.get('/getcourses', (req, res) => {
    const sql = 'SELECT id, title, price, branch, description, syllabus FROM courses';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        const courses = results.map(course => ({
            id: course.id,
            title: course.title,
            price: course.price,
            branch: course.branch,
            description: course.description,
            syllabus: course.syllabus,
            image: `./images/courses/${course.branch}/${course.id}.jpg`
        }));
        res.json(courses);
    });
});

module.exports = router;
