import { Request, Response } from 'express';
import { PackageStore } from '../models/package-model';
import io from '../app';

const store = new PackageStore();

export const indexController = async (req: Request, res: Response) => {
    try {
        const packages = await store.index();
        res.json(packages);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const showController = async (req: Request, res: Response) => {
    try {
        const packageData = await store.show(req.params.id);
        if (!packageData) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(packageData);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createController = async (req: Request, res: Response) => {
    try {
        const newPackage = await store.create(req.body);
        io.emit('package_created', { event: 'package_created', package: newPackage });
        res.status(201).json(newPackage);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const updateController = async (req: Request, res: Response) => {
    try {
        const updatedPackage = await store.update(req.params.id, req.body);
        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        io.emit('package_updated', { event: 'package_updated', package: updatedPackage });
        res.status(200).json(updatedPackage);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const destroyController = async (req: Request, res: Response) => {
    try {
        const deletedPackage = await store.delete(req.params.id);
        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        io.emit('package_deleted', { event: 'package_deleted', package_id: req.params.id });
        res.status(200).json(deletedPackage);
    } catch (err) {
        res.status(500).json(err);
    }
};