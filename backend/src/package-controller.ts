import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { io } from './app';

// Define Package Schema
const PackageSchema = new mongoose.Schema({
    package_id: { type: String, default: uuidv4 },
    active_delivery_id: { type: String },
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    depth: { type: Number, required: true },
    from_name: { type: String, required: true },
    from_address: { type: String, required: true },
    from_location: { lat: { type: Number }, lng: { type: Number } },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
    to_location: { lat: { type: Number }, lng: { type: Number } },
});

const Package = mongoose.model('Package', PackageSchema);
const router = Router();

// Create a new package
router.post('/', async (req: Request, res: Response) => {
    try {
        const packageData = new Package(req.body);
        await packageData.save();
        io.emit('package_created', { event: 'package_created', package: packageData });
        res.status(201).json(packageData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create package', error });
    }
});

// Get all packages
router.get('/', async (req: Request, res: Response) => {
    try {
        const packages = await Package.find();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch packages', error });
    }
});

// Get package by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const packageData = await Package.findById(req.params.id);
        if (!packageData) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json(packageData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch package', error });
    }
});

// Update a package
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        io.emit('package_updated', { event: 'package_updated', package: updatedPackage });
        res.status(200).json(updatedPackage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update package', error });
    }
});

// Delete a package
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const packageData = await Package.findByIdAndDelete(req.params.id);
        if (!packageData) {
            return res.status(404).json({ message: 'Package not found' });
        }
        io.emit('package_deleted', { event: 'package_deleted', package_id: req.params.id });
        res.status(200).json({ message: 'Package deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete package', error });
    }
});

export const PackageRouter = router;