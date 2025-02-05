const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
const signupRoutes=require('./routes/signUpRoutes');
const forgotpasswordRoute=require('./routes/forgotPasswordRoutes');
const loginStudentRoute=require('./routes/loginStudentRoute');
const facultyloginRoute=require('./routes/facultyLoginRoute');
const fetchCourses=require('./routes/fetchCourses');
const fetchInternships=require('./routes/fetchInternships');
const addNewInternship=require('./routes/addNewInternship');
const app = express();
const cors=require('cors');
const fileUpload = require('express-fileupload');
const courseRoutes=require('./routes/addNewCourse');
const workshopRoutes=require('./routes/fetchWorkshops');
const addNewWorkshop=require('./routes/addNewWorkshop');
const fetchProjects=require('./routes/fetchProject');
const addNewProject=require('./routes/addNewProject');
const coursePaymentRoute=require('./routes/coursepaymentsRoute');
// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use("/courses",express.static("uploads"));
// Routes

app.use('/api',signupRoutes);
app.use('/api/forgotpassword',forgotpasswordRoute);
app.use('/api/loginStudents',loginStudentRoute);
app.use('/api/facultyLogin',facultyloginRoute);
app.use('/api/fetch',fetchCourses);
app.use('/api/fetchInterns',fetchInternships);
app.use('/api/courses',courseRoutes);
app.use('/api/interns',addNewInternship);
app.use('/api/workshop',workshopRoutes);
app.use('/api/workshopsadd',addNewWorkshop);
app.use('/api/fetchProjects',fetchProjects);
app.use('/api/addProjects',addNewProject);
app.use('/api/addCoursePaymentRoute',coursePaymentRoute);
// Redirect HTTP to HTTPS
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        res.redirect(301, `https://${req.headers.host}${req.url}`);
    } else {
        next();
    }
});


// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// SSL configuration
const sslServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    },
    app
);

// Start server
sslServer.listen(443, () => {
    console.log('Secure server established on port 443');
});
