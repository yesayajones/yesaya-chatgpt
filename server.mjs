import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Load MongoDB connection string from .env
const uri = process.env.MONGODB_URI;

console.log(uri);

const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 60000,
});

let chatLogs;

async function connectToDatabase() {
	try {
		// Connect to the MongoDB database
		await client.connect();
		console.log('Connected to MongoDB');

		// Access the chat logs collectiona
		const db = client.db('chat');
		chatLogs = db.collection('chatlogs');

		// Perform CRUD operations on the chat logs collection
		// ...
	} catch (e) {
		console.error(e);
	}
}

connectToDatabase();

// Define schema for chat
const chatLogSchema = new mongoose.Schema({
	user: String,
	message: String,
	timestamp: { type: Date, default: Date.now },
});

// Create model for chat logs
const ChatLog = mongoose.model('ChatLog', chatLogSchema, 'chatlogs');

// Parse incoming requests as JSON
app.use(bodyParser.json());

// Create endpoint for adding new chat
app.post('/api/chatlogs', async (req, res) => {
	console.log(req.body); //log the request content to my terminal
	const { user, message } = req.body;

	try {
		// Create new chat log
		const chatLog = { user, message, timestamp: new Date() };
		const result = await chatLogs.insertOne(chatLog);

		res.status(201).json(result.result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to create chat log' });
	}
});

// Create endpoint for retrieving all chat logs
app.get('/api/chatlogs', async (req, res) => {
	try {
		// retrieve all chat logs
		const logs = await chatLogs.find().sort({ timestamp: -1 }).toArray();

		res.json(logs);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to retrieve chat logs' });
	}
});

// Create endpoint for deleting a chat log
app.delete('/api/chatlogs/:id', async (req, res) => {
	const { id } = req.params;

	try {
		// Delete chat log with specified ID
		const result = await chatLogs.deleteOne({ _id: ObjectId(id) });

		if (result.deletedCount === 0) {
			res.status(404).json({ error: 'Chat log not found' });
		} else {
			res.sendStatus(204);
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to delete chat log' });
	}
});

// Start server
const port = process.env.PORT || 3000;
// app.listen(port, () => {
// 	console.log(`Server listening on port ${port}`);
// });
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
