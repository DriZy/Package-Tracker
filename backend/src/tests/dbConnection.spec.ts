import mongoose from 'mongoose';
import { expect } from 'chai';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/package_tracker';

describe('Database Connection', () => {
    // Establish a connection to MongoDB before running tests
    before(async () => {
        await mongoose.connect(mongoUri);
    });

    // Close the connection after all tests
    after(async () => {
        await mongoose.connection.close();
    });

    // Test to check if the connection was successful
    it('should connect to the database successfully', () => {
        expect(mongoose.connection.readyState).to.equal(1); // Check if the connection state is "connected"
    });

    // Test to check if invalid URI causes a connection failure
    it('should fail connecting to the database with an invalid URI', async () => {
        const invalidUri = 'invalid-uri';
        await mongoose.disconnect(); // Disconnect before testing with invalid URI

        try {
            await mongoose.connect(invalidUri);
            throw new Error('Should have thrown an error');
        } catch (err) {
            expect(err).to.exist; // Ensure an error is thrown
        }
    });
});