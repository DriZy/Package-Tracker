import supertest from 'supertest';
import {app} from '../app';
import mongoose from 'mongoose';

describe('Delivery API', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost/package-tracker-test',)
            .then((r) => console.log('Connected to MongoDB', r))
            .catch((error) => console.error('Error connecting to MongoDB', error));
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a new delivery', async (done) => {
        const newPackage = {
            description: 'Test Delivery Package',
            weight: 400,
            width: 25,
            height: 10,
            depth: 12,
            from_name: 'John Doe',
            from_address: '123 Sender Ave',
            to_name: 'Jane Doe',
            to_address: '789 Receiver Blvd',
            from_location: {lat: 37.7749, lng: -122.4194},
            to_location: {lat: 34.0522, lng: -118.2437}
        };

        const packageResponse = await supertest(app)
            .post('/api/package')
            .send(newPackage);

        const newDelivery = {
            package_id: packageResponse.body._id,
            location: {lat: 37.7749, lng: -122.4194},
            status: 'open',
        };

        const response = await supertest(app)
            .post('/api/delivery')
            .send(newDelivery);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe('open');
        done();
    });

    it('should fetch all deliveries', async (done) => {
        const response = await supertest(app)
            .get('/api/delivery');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        done();
    });

    it('should fetch a delivery by ID', async (done) => {
        const newPackage = {
            description: 'Test Delivery Package 2',
            weight: 350,
            width: 22,
            height: 8,
            depth: 10,
            from_name: 'John Smith',
            from_address: '321 Sender Lane',
            to_name: 'Jane Smith',
            to_address: '654 Receiver Rd',
            from_location: {lat: 37.7749, lng: -122.4194},
            to_location: {lat: 34.0522, lng: -118.2437}
        };

        const packageResponse = await supertest(app)
            .post('/api/package')
            .send(newPackage);

        const newDelivery = {
            package_id: packageResponse.body._id,
            location: {lat: 40.7128, lng: -74.0060},
            status: 'open',
        };

        const deliveryResponse = await supertest(app)
            .post('/api/delivery')
            .send(newDelivery);

        const deliveryId = deliveryResponse.body._id;

        const response = await supertest(app)
            .get(`/api/delivery/${deliveryId}`);

        expect(response.status).toBe(200);
        expect(response.body._id).toBe(deliveryId);
        expect(response.body.package_id).toBe(newDelivery.package_id);
        expect(response.body.status).toBe('open');
        done();
    });
});