// Import the necessary dependencies
const { ObjectId } = require('mongodb');
const mongoDB = require('../model/mongodb');

// Function to sort projectDetails based on a given filter
function filterBy(filter, projectDetails) {
    switch (filter) {
        case 'Title':
            // Sorting projectDetails by project name
            for (let check = 0; check < projectDetails.length; ++check) {
                for (let index = 0; index < projectDetails.length - 1; ++index) {
                    let temp = null;
                    if (projectDetails[index].projectName > projectDetails[index + 1].projectName) {
                        temp = projectDetails[index];
                        projectDetails[index] = projectDetails[index + 1];
                        projectDetails[index + 1] = temp;
                    }
                }
            }
            return projectDetails;

        case 'Description':
            // Sorting projectDetails by description
            for (let check = 0; check < projectDetails.length; ++check) {
                for (let index = 0; index < projectDetails.length - 1; ++index) {
                    let temp = null;
                    if (projectDetails[index].description > projectDetails[index + 1].description) {
                        temp = projectDetails[index];
                        projectDetails[index] = projectDetails[index + 1];
                        projectDetails[index + 1] = temp;
                    }
                }
            }
            return projectDetails;

        case 'Author':
            // Sorting projectDetails by author name
            for (let check = 0; check < projectDetails.length; ++check) {
                for (let index = 0; index < projectDetails.length - 1; ++index) {
                    let temp = null;
                    if (projectDetails[index].authorName > projectDetails[index + 1].authorName) {
                        temp = projectDetails[index];
                        projectDetails[index] = projectDetails[index + 1];
                        projectDetails[index + 1] = temp;
                    }
                }
            }
            return projectDetails;

        default:
            break;
    }
}

// Render the Issue Tracker page
module.exports.issueTrackerPage = async (req, res) => {
    const collection = await mongoDB();
    // Fetch added projects from MongoDB
    const addedProject = await collection.find({ id: 'addedProject' }).toArray();
    return res.render('issueTracker', {
        title: "Issue Tracker",
        addedProject
    })
}

// Render the Create Project page
module.exports.createProject = (req, res) => {
    return res.render('createProject', {
        title: "Create Project"
    })
}

// Add a project to MongoDB
module.exports.addProjectToMongoDB = async (req, res) => {
    let formData = req.body;
    formData = { ...formData, id: "addedProject" }
    const collection = await mongoDB();
    // Insert the project data into MongoDB
    collection.insertOne(formData, (err, data) => {
        if (err)
            throw err
        else if (data)
            console.log('data inserted')
    });
    res.redirect('/issueTracker')
}

// Render the Project Details page
module.exports.projectDetails = async (req, res) => {
    const collection = await mongoDB();
    // Fetch project details from MongoDB
    let projectDetails = await collection.find({ id: 'addedProject' }).toArray();
    return res.render('projectDetails', {
        title: "Project Details",
        projectDetails
    })
}

// Filter and render Project Details based on user-selected criteria
module.exports.filterProjectDetails = async (req, res) => {
    const collection = await mongoDB();
    let projectDetails = await collection.find({ id: 'addedProject' }).toArray();
    const filterReq = req.body;

    if (filterReq.flexRadio === 'Project Title') {
        // Filter project details by title
        const filteredProjectDetails = filterBy('Title', projectDetails)
        return res.render('projectDetails', { title: "Project Details", projectDetails: filteredProjectDetails })
    }
    else if (filterReq.flexRadio === 'Project Description') {
        // Filter project details by description
        const filteredProjectDetails = filterBy('Description', projectDetails)
        return res.render('projectDetails', { title: "Project Details", projectDetails: filteredProjectDetails })
    }
    else if (filterReq.flexRadio === 'Project Author') {
        // Filter project details by author
        const filteredProjectDetails = filterBy('Author', projectDetails)
        return res.render('projectDetails', { title: "Project Details", projectDetails: filteredProjectDetails })
    }
}

// Render the Create Issue page
module.exports.createAnIssue = async (req, res) => {
    const issueId = req.params;
    return res.render('createIssue', { title: "Create Issue", issueId })
}

// Add an issue to a project in MongoDB
module.exports.addAnIssue = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    const issue = req.body;
    const bugId = req.params.id;
    const collection = await mongoDB();
    // Add the issue to the specified project in MongoDB
    await collection.findOneAndUpdate({ _id: new ObjectId(bugId) }, { '$push': { bugs: issue } });

    res.redirect('/issueTracker/projectDetails')
}
