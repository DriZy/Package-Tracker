import { Server } from 'socket.io';

export const setupWebSocket = (server: any) => {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('A user connected');

        // Handle location updates
        socket.on('location_changed', (data) => {
            // Broadcast the new location to all connected clients
            socket.broadcast.emit('location_updated', data);
        });

        // Handle status updates
        socket.on('status_changed', (data) => {
            // Broadcast the new status to all connected clients
            socket.broadcast.emit('status_updated', data);
        });

        socket.on('disconnect', () => {
            console.log('A user disconnected');
        });
    });

    return io;
};