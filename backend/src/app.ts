import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './common/db-connection';
import userRoutes from './routes/user-routes';
import packageRoutes from './routes/package-routes';
import deliveryRoutes from './routes/delivery-routes';
import requestLogger from './middleware/requestLogger';
import {setupWebSocket} from "./sockets";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(requestLogger);
app.use(cors());

// Connect to the database
connectToDB()
    .then(() => console.log("Connected To MongoDB Successfully"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });

// Define Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Package Tracker API');
});

// Register Routes
app.use('/api/users', userRoutes);
app.use('/api/package', packageRoutes);
app.use('/api/delivery', deliveryRoutes);

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // Log the error stack
    console.error(err.stack);

    // Set default status code and message
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Send error response
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

setupWebSocket(server);

export default app;