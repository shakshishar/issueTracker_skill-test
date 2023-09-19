const express = require('express');
const router = express.Router();
const issueTrackerPath = require('./issueTracker')

//routes for the main page
router.get('/', (req,res)=>{res.redirect('/issueTracker')})

router.use('/issueTracker', issueTrackerPath)

module.exports = router;