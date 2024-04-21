const socketIo = require('socket.io');

const configureWebSocket = (server) => {
    const io = socketIo(server);

    io.on('connection', socket => {
        console.log('Client connected');

        socket.on('message', async (messageText) => {
            try {
                io.emit('message', messageText);
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = configureWebSocket;
