import request from 'supertest';
import app from '../app'; // Make sure the path is correct
import mongoose from 'mongoose';
import { User } from '../models/user.model'; // Adjust path as necessary

describe('User API Endpoints', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/package-tracker').then((res) => {
            console.log("Connected to DB", res.Collection) }).catch((err) => {
            console.log("Error connecting to DB", err)});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });

        expect(res.status).toBe(201);
        expect(res.body.token).toBeDefined();
    });

    it('should fail registering an existing user', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Username already taken');
    });

    it('should login and return a JWT token', async () => {
        const res = await request(app)
            .post('/api/users/auth')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it('should fetch all users', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`); // Assuming token is defined earlier

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});