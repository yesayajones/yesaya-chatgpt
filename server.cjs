const express = require('express');
const app = express();

app.get('/api/chatlogs', (req, res) => {
	const chatLogs = [
		{ user: 'Alice', message: 'Hello', timestamp: new Date() },
		{ user: 'Bob', message: 'Hi there', timestamp: new Date() },
	];

	res.json(chatLogs);
});

app.post('/api/chatlogs', (req, res) => {
	const { user, message } = req.body;

	const chatLog = { user, message, timestamp: new Date() };
	console.log(chatLog);

	res.sendStatus(201);
});

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
