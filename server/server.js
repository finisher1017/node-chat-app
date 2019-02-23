const express = require('express');
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const {generateMessage} = require('./utils/message');


const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log("New user connected");

	// socket.emit from Admin text Welcome to the chat app
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

	// socket.broadcast.emit from Admin text New user joined
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined the chat.'));
	

	socket.on('createMessage', (message) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
	// });
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

server.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
