import supertest from 'supertest';
import { app } from '../app';
import mongoose from 'mongoose';

describe('Package API', () => {
    // Before running the tests, connect to a test database
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/package-tracker-test', )});

    // Close connection after the tests
    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new package', async (done) => {
        const newPackage = {
            description: 'Test Package',
            weight: 500,
            width: 20,
            height: 15,
            depth: 10,
            from_name: 'Alice',
            from_address: '123 Sender St',
            to_name: 'Bob',
            to_address: '456 Receiver Rd',
        };

        const response = await supertest(app)
            .post('/api/package')
            .send(newPackage);

        expect(response.status).toBe(200);
        expect(response.body.description).toBe(newPackage.description);
        expect(response.body.weight).toBe(newPackage.weight);
        done();
    });

    it('should fetch all packages', async (done) => {
        const response = await supertest(app)
            .get('/api/package');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Expect an array of packages
        done();
    });

    it('should fetch a package by ID', async (done) => {
        const newPackage = {
            description: 'Test Package 2',
            weight: 300,
            width: 10,
            height: 5,
            depth: 8,
            from_name: 'Eve',
            from_address: '789 Sender St',
            to_name: 'Mallory',
            to_address: '123 Receiver Rd',
        };

        const createResponse = await supertest(app)
            .post('/api/package')
            .send(newPackage);

        const packageId = createResponse.body._id;

        const response = await supertest(app)
            .get(`/api/package/${packageId}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(packageId);
        expect(response.body.description).toBe(newPackage.description);
        done();
    });
});