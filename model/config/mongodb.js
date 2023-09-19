const MongoClient = require('mongodb').MongoClient;
// mongodb atlas connection url
const url = 'mongodb+srv://sakshi:sakshishar12@cluster0.rhakgv2.mongodb.net/?retryWrites=true&w=majority'

async function getEmpData() {
    let client = await MongoClient.connect(url);
    let connection = client.db('issueTracker'); // Establish connection
    return connection.collection('IssueTracker2023'); // creating a collection and naming it also
}

module.exports = getEmpData;