const { MongoClient, ObjectId } = require ('mongodb');
// require("dotenv").config();
const uri = require('./atlas_uri');

console.log(`Connection String : ${uri}`);

const client = new MongoClient(uri);
const dbname = "blog";
const collection_name = "posts";

const postsCollection = client.db(dbname).collection(collection_name);

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log(`Connected to ${dbname} database ⚙️`);
    } catch (err) {
        console.error(`Error connecting to the database: ${err}`);
}
};

const documentsToDelete = { Age: {$gt: 24}};


const main = async () => {
    try {
        await connectToDatabase();
        let result = await postsCollection.deleteMany(documentsToDelete);
        result.deletedCount > 0
        ? console.log(`Deleted ${result.deletedCount} documents`)
        : console.log("No documents deleted")
    } catch (err) {
        console.error(`Error updating the document: ${err}`);
    } finally {
        await client.close();
    }
};

main();
