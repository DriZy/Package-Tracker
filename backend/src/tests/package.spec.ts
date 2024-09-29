import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../app';
import { expect } from 'chai';

const request = supertest(app);
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/package_tracker';

describe('Package API', () => {
    before(async () => {
        await mongoose.connect(mongoUri);
    });

    after(async () => {
        await mongoose.connection.close();
    });

    it('should create a new package', async () => {
        const newPackage = {
            description: 'Test Package',
            weight: 400,
            width: 25,
            height: 10,
            depth: 12,
            from_name: 'John Doe',
            from_address: '123 Sender Ave',
            from_location: { lat: 37.7749, lng: -122.4194 },
            to_name: 'Jane Doe',
            to_address: '789 Receiver Blvd',
            to_location: { lat: 34.0522, lng: -118.2437 },
        };

        const response = await request.post('/api/package').send(newPackage);

        expect(response.status).to.equal(201);
        expect(response.body.description).to.equal(newPackage.description);
    });

    it('should fetch all packages', async () => {
        const response = await request.get('/api/package');

        expect(response.status).to.equal(200);
        expect(Array.isArray(response.body)).to.be.true;
    });

    it('should fetch a package by ID', async () => {
        const packageId = 'some-package-id'; // Replace with an actual ID after creating a package

        const response = await request.get(`/api/package/${packageId}`);

        expect(response.status).to.equal(200);
        expect(response.body._id).to.equal(packageId);
    });

    it('should update a package', async () => {
        const packageId = 'some-package-id'; // Replace with an actual ID
        const updatedPackage = {
            description: 'Updated Test Package',
            weight: 450,
        };

        const response = await request.put(`/api/package/${packageId}`).send(updatedPackage);

        expect(response.status).to.equal(200);
        expect(response.body.description).to.equal(updatedPackage.description);
    });

    it('should delete a package', async () => {
        const packageId = 'some-package-id'; // Replace with an actual ID

        const response = await request.delete(`/api/package/${packageId}`);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Package deleted successfully');
    });
});