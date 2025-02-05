const express = require('express');
const db = require('../config/dbConfig');
const router=express.Router();

// Fetch courses from database
router.get('/getworkshops', (req, res) => {
    const sql = 'SELECT id, name,branch,startDate,description FROM workshops';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        const courses = results.map(course => ({
            id: course.id,
            title: course.name,
            branch: course.branch,
            startDate: course.startDate,
            description: course.description,
            image: `./images/workshop/${course.branch}/${course.id}.jpg`
        }));
        res.json(courses);
    });
});

module.exports = router;
