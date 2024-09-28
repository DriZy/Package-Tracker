import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { PackageRouter } from './package-controller';
import { DeliveryRouter } from './delivery-controller';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/auth-middleware';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://package_tracker-mongodb:27017/package_tracker';

// MongoDB connection
mongoose.connect(mongoUri).then((response) => {
    console.log('Connected to MongoDB', response.Collection);
}).catch((error) => { console.error('Error connecting to MongoDB', error); });

app.use('/api/package', authMiddleware, PackageRouter);
app.use('/api/delivery', authMiddleware, DeliveryRouter);

app.get('/', (req, res) => {
    res.send('API is running');
});

// Export io for WebSocket events in the controllers
export { io, app };

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});