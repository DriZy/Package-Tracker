import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import {connectToDB, disconnectFromDB} from "../common/db-connection";

const request = supertest(app);

let token: string = process.env.AUTH_TOKEN as string;
let packageId = '';
describe('Package API', () => {
    // beforeAll(async () => {
    //     await connectToDB();
    // });
    // afterAll(async () => { await disconnectFromDB(); });
    test('should create a new package', async () => {
        const newPackage = {
            description: 'Test Package 3',
            weight: 400,
            dimensions: {
                width: 25,
                height: 10,
                depth: 12,
            },
            from_name: 'John Doe',
            from_address: '123 Sender Ave',
            from_location: {lat: 37.7749, lng: -122.4194},
            to_name: 'Jane Doe',
            to_address: '789 Receiver Blvd',
            to_location: {lat: 34.0522, lng: -118.2437},
        };

        const response = await request
            .post('/api/packages/new')
            .set('Authorization', `Bearer ${token}`)
            .send(newPackage);

        expect(response.status).toBe(201);
        expect(response.body.description).toBe(newPackage.description);
        packageId = response.body._id;
    });

    test('should fetch all packages', async () => {
        const response = await request
            .get('/api/packages')
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should fetch a package by ID', async () => {
        const response = await request
            .get(`/api/packages/${packageId}`)
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(200);
        expect(response.body._id).toBe(packageId);
    });

    test('should update a package', async () => {
        const updatedPackage = {
            description: 'Updated Test Package',
            weight: 450,
        };

        const response = await request
            .put(`/api/packages/${packageId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedPackage);

        expect(response.status).toBe(200);
        expect(response.body.description).toBe(updatedPackage.description);
    });

    test('should delete a package', async () => {
        const response = await request
            .delete(`/api/packages/${packageId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Package deleted successfully');
    });
});