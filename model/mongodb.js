const { MongoClient } = require('mongodb');

// MongoDB Atlas connection URL
const uri = 'mongodb+srv://sakshi:sakshishar12@cluster0.rhakgv2.mongodb.net/?retryWrites=true&w=majority';

async function getEmpData() {
  try {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    const database = client.db('issueTracker');
    const collection = database.collection('IssueTracker2023');

    return collection;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = getEmpData;
