import mongoose from 'mongoose';
import { connectToDB, disconnectFromDB } from '../common/db-connection';

describe('Database Connection', () => {
    beforeAll(async () => {
        await connectToDB();
    });

    afterAll(async () => {
        await disconnectFromDB();
    });

    test('should connect to the database successfully', async () => {
        expect(mongoose.connection.readyState).toBe(1); // Check if connected
    });

    test('should fail connecting to the database with an invalid URI', async () => {
        const invalidUri = 'invalid-uri';
        await disconnectFromDB(); // Ensure we're disconnected before testing with an invalid URI

        await expect(mongoose.connect(invalidUri)).rejects.toThrow(); // Check for error on invalid connection
    });
});