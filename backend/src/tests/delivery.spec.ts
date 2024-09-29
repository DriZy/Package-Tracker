import request from 'supertest';
import app from '../app'; // Adjust path as necessary

describe('Delivery API Endpoints', () => {
    it('should create a new delivery', async () => {
        const newPackage = {
            description: 'Test Delivery Package',
            weight: 3,
            dimensions: { width: 10, height: 12, depth: 8 },
            from_name: 'John Doe',
            from_address: '123 Sender Ave',
            to_name: 'Jane Doe',
            to_address: '789 Receiver Blvd',
        };

        const packageResponse = await request(app)
            .post('/api/packages')
            .send(newPackage);

        const newDelivery = {
            package_id: packageResponse.body._id,
            location: { lat: 37.7749, lng: -122.4194 },
            status: 'open',
        };

        const deliveryResponse = await request(app)
            .post('/api/deliveries')
            .send(newDelivery);

        expect(deliveryResponse.status).toBe(201);
        expect(deliveryResponse.body.status).toBe('open');
    });

    it('should fetch all deliveries', async () => {
        const response = await request(app).get('/api/deliveries');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});