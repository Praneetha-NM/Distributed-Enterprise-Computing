const express = require('express');
const http = require('http');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Serve static files from the public directory
app.use(express.static('public'));


// Socket.IO connection
io.on('connection', (socket) => {
   console.log('A user connected');


   // Listen for drawing data
   socket.on('drawing', (data) => {
       socket.broadcast.emit('drawing', data);
   });


   socket.on('disconnect', () => {
       console.log('A user disconnected');
   });
});


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
