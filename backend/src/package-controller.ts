import { Router } from 'express';
import mongoose from 'mongoose';
import { authMiddleware } from './middleware/auth-middleware';

const PackageSchema = new mongoose.Schema({
    package_id: { type: String },
    description: String,
    //TODO add other fields here
    // other fields...
});

const Package = mongoose.model('Package', PackageSchema);

const router = Router();

// Apply the middleware only to the package routes
router.use(authMiddleware); // All routes below this will use the middleware

// Package Routes
router.get('/', async (req, res) => {
    const packages = await Package.find();
    res.json(packages);
});

router.post('/', async (req, res) => {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.json(newPackage);
});

export const PackageRouter = router;