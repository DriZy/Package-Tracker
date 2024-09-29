import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app'; // Adjust the path as necessary
import { expect } from 'chai';

const request = supertest(app);
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/package_tracker';

describe('Delivery API', () => {
    before(async () => {
        await mongoose.connect(mongoUri);
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it('should create a new delivery', async () => {
        const newDelivery = {
            package_id: 'some-package-id', // Ensure this package ID exists
            location: { lat: 37.7749, lng: -122.4194 },
            status: 'open',
        };

        const response = await request.post('/api/delivery').send(newDelivery);

        expect(response.status).to.equal(201);
        expect(response.body.status).to.equal('open');
    });

    it('should fetch all deliveries', async () => {
        const response = await request.get('/api/delivery');

        expect(response.status).to.equal(200);
        expect(Array.isArray(response.body)).to.be.true;
    });

    it('should fetch a delivery by ID', async () => {
        const deliveryId = 'some-delivery-id'; // Replace with an actual ID

        const response = await request.get(`/api/delivery/${deliveryId}`);

        expect(response.status).to.equal(200);
        expect(response.body._id).to.equal(deliveryId);
    });

    it('should update a delivery', async () => {
        const deliveryId = 'some-delivery-id'; // Replace with an actual ID
        const updatedDelivery = {
            status: 'picked-up',
            location: { lat: 37.7849, lng: -122.4294 },
        };

        const response = await request.put(`/api/delivery/${deliveryId}`).send(updatedDelivery);

        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal(updatedDelivery.status);
    });

    it('should delete a delivery', async () => {
        const deliveryId = 'some-delivery-id'; // Replace with an actual ID

        const response = await request.delete(`/api/delivery/${deliveryId}`);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Delivery deleted successfully');
    });
});