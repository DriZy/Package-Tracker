import app from '../app'; // Make sure the path is correct
import {connectToDB, disconnectFromDB} from "../common/db-connection";
import supertest from "supertest";

const request = supertest(app);
let token: string = process.env.AUTH_TOKEN as string;
let userId = '';
describe('User API Endpoints', () => {
    // beforeAll(async () => {
    //     await connectToDB();
    // });
    // afterAll(async () => {
    //     await disconnectFromDB();
    // });
    test('should register a new user', async () => {
        const res = await request
            .post('/api/users/signup')
            .send({
                username: 'testuser3',
                password: 'testpassword3',
            });
        expect(res.status).toBe(201);
        expect(res.body.token).toBeDefined();
        token = res.body.token;
        userId = res.body._id;
    });

    test('should fail registering an existing user', async () => {
        const res = await request
            .post('/api/users/signup')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Username already exist');
    });

    test('should login and return a JWT token', async () => {
        const res = await request
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'testpassword',
            });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    test('should fetch all users', async () => {
        const res = await request
            .get('/api/users')
            .set('Authorization', `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});