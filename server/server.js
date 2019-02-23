const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log("New user connected");

	socket.emit('newMessage', {
		from: 'Megajon Server',
		text: 'I am Megajon!',
		created: Date()
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
