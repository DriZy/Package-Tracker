import { connect, connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://package_tracker-mongodb:27017/package_tracker';

// Function to connect to MongoDB
export const connectToDB = async (): Promise<void> => {
    try {
        await connect(mongoUri); // Wait for the connection to be established
        console.log('Connected to MongoDB successfully');
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error.message);
        throw new Error('Database connection failed'); // Throw an error to indicate failure
    }
};

// Function to disconnect from MongoDB
export const disconnectFromDB = async (): Promise<void> => {
    try {
        await connection.close();
        console.log('MongoDB connection closed successfully');
    } catch (error: any) {
        console.error('Error closing the MongoDB connection:', error.message);
        throw new Error('Failed to close database connection'); // Throw an error to indicate failure
    }
};