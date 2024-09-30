import supertest from 'supertest';
import app from '../app';
import {connectToDB, disconnectFromDB} from "../common/db-connection"; // Ensure this path is correct

const request = supertest(app);
let token: string = process.env.AUTH_TOKEN as string;
let deliveryId = '';
describe('deliveries API', () => {
    // beforeAll(async () => {
    //     await connectToDB();
    // });
    // afterAll(async () => { await disconnectFromDB(); });
    test('should create a new deliveries', async () => {
        const newdeliveries = {
            package_id: '66f9e18a376d8ed59ea25846', // Ensure this package ID exists
            location: {lat: 37.7749, lng: -122.4194},
            status: 'open',
        };

        const response = await request
            .post('/api/deliveries/new')
            .set('Authorization', `Bearer ${token}`)
            .send(newdeliveries);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe('open');
        deliveryId = response.body._id;
    });

    test('should fetch all deliveries', async () => {
        const response = await request
            .get('/api/deliveries')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('should fetch a deliveries by ID', async () => {
        const response = await request
            .get(`/api/deliveries/${deliveryId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(deliveryId);
    });

    test('should update a deliveries', async () => {
        const updateddeliveries = {
            status: 'picked-up',
            location: {lat: 37.7849, lng: -122.4294},
        };

        const response = await request
            .put(`/api/deliveries/${deliveryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updateddeliveries);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(updateddeliveries.status);
    });

    test('should delete a deliveries', async () => {
        const response = await request
            .delete(`/api/deliveries/${deliveryId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Delivery deleted successfully');
    });
});