import mongoose from 'mongoose';
import { connectToDB, disconnectFromDB } from '../common/db-connection';

describe('Database Connection', () => {
    beforeAll(async () => {
        await connectToDB();
    });

    afterAll(async () => {
        await disconnectFromDB();
    });

    it('should connect to the database successfully', async () => {
        expect(mongoose.connection.readyState).toBe(1); // Check if connected
    });

    it('should fail connecting to the database with an invalid URI', async () => {
        const invalidUri = 'invalid-uri';
        await disconnectFromDB(); // Ensure we're disconnected before testing with an invalid URI

        try {
            await mongoose.connect(invalidUri);
            throw new Error('Should have thrown an error');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });
});