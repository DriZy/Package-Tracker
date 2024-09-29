import { connect, connection} from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://package_tracker-mongodb:27017/package_tracker';

export const connectToDB = async (): Promise<void> => {
    try {
        //@ts-ignore
        connect(mongoUri).then((r) => console.log('Connected to MongoDB', r.Collection.name))
            .catch((error) => console.error('Error connecting to MongoDB', error.message));
        console.log('MongoDB connected successfully');
    } catch (err: unknown) {
        console.error(`Error connecting to MongoDB: ${err}`);
        process.exit(1); // Exit the process with failure
    }
};

export const disconnectFromDB = async (): Promise<void> => {
    try {
        await connection.close();
        console.log('MongoDB connection closed');
    } catch (err) {
        console.error(`Error closing the MongoDB connection: ${err}`);
    }
};