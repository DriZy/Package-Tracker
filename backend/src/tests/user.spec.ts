import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app'; // Adjust the path as necessary
import { expect } from 'chai';

let token: string = process.env.JWT_SECRET as string;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/package_tracker'; // Use localhost for local testing
const request = supertest(app);

describe('User API Endpoints', () => {
    // Establish a connection to MongoDB before running tests
    before(async () => {
        await mongoose.connect(mongoUri);
    });

    // Close the connection after all tests
    after(async () => {
        await mongoose.connection.close();
    });

    // Test to register a new user
    it('should register a new user', async () => {
        const res = await request
            .post('/users')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });

        expect(res.status).to.equal(201);
        expect(res.body.token).to.exist; // JWT token should be returned
        token = res.body.token; // Store the token for use in subsequent tests
    });

    // Test to fail registering an existing user
    it('should fail registering an existing user', async () => {
        const res = await request
            .post('/users')
            .send({
                username: 'testuser', // Same username as before
                password: 'testpassword',
            });

        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Username already taken');
    });

    // Test to login and return a JWT token
    it('should login and return a JWT token', async () => {
        const res = await request
            .post('/users/auth')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });

        expect(res.status).to.equal(200);
        expect(res.body.token).to.exist; // Update token for authenticated routes
        token = res.body.token;
    });

    // Test to access protected route with valid token
    it('should access protected route with valid token', async () => {
        const res = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).to.equal(200);
        expect(Array.isArray(res.body)).to.be.true; // Expect an array of users
    });

    // Test to fail accessing protected route without token
    it('should fail accessing protected route without token', async () => {
        const res = await request.get('/users');

        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Unauthorized: No token provided');
    });

    // Test to fail accessing protected route with invalid token
    it('should fail accessing protected route with invalid token', async () => {
        const res = await request
            .get('/users')
            .set('Authorization', 'Bearer invalid token');

        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('Forbidden: Invalid token');
    });
});