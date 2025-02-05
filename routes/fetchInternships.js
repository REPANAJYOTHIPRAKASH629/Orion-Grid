const express = require('express');
const db = require('../config/dbConfig');
const router=express.Router();

// Fetch courses from database
router.get('/getinternships', (req, res) => {
    const sql = 'SELECT id, title, monthOne, monthTwo, monthThree, branch, description,syllabus FROM internships';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching courses:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        const courses = results.map(course => ({
            id: course.id,
            title: course.title,
            monthOne: course.monthOne,
            monthTwo:course.monthTwo,
            monthThree:course.monthThree,
            branch: course.branch,
            description: course.description,
            image: `./images/internships/${course.branch}/${course.id}.jpg`,
            syllabus: course.syllabus
        }));
        res.json(courses);
    });
});

module.exports = router;
