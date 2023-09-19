const express = require('express');
const { issueTrackerPage, createProject, addProjectToMongoDB, projectDetails, filterProjectDetails, createAnIssue, addAnIssue } = require('../controller/issueController');
const router = express.Router();

// Route to display the Issue Tracker page
router.get('/', issueTrackerPage);

// Route to display the Create Project page
router.get('/createProject', createProject);

// Route to add a new project to MongoDB
router.post('/addProject', addProjectToMongoDB);

// Route to display project details
router.get('/projectDetails', projectDetails);

// Route to filter and display project details based on filtered criteria
router.post('/filterProjectDetails', filterProjectDetails);

// Route to display the Create Issue page for  project
router.get('/createAnIssue/:id', createAnIssue);

// Route to add an issue to a project in MongoDB
router.post('/createAnIssue/:id/addIssue', addAnIssue);

module.exports = router;
