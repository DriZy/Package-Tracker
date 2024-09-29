import request from 'supertest';
import app from '../app'; // Adjust path as necessary

describe('Package API Endpoints', () => {
    it('should create a new package', async () => {
        const newPackage = {
            description: 'Test Package',
            weight: 5,
            dimensions: { width: 10, height: 15, depth: 5 },
            from_name: 'John Doe',
            from_address: '123 Main St',
            to_name: 'Jane Smith',
            to_address: '456 Secondary St',
        };

        const response = await request(app)
            .post('/api/packages')
            .send(newPackage);

        expect(response.status).toBe(201);
        expect(response.body.description).toBe(newPackage.description);
    });

    it('should get all packages', async () => {
        const response = await request(app).get('/api/packages');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});