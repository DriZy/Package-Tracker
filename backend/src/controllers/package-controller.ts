import { Request, Response } from 'express';
import {Package, PackageStore} from '../models/package-model';
import io from '../app';
import {Delivery} from "../models/delivery-model";

const store = new PackageStore();

export const indexController = async (req: Request, res: Response) => {
    try {
        const filters = req.query as Partial<Package>;

        const isEmptyFilters = Object.values(filters).every(value => value === "");

        if (isEmptyFilters || Object.keys(filters).length === 0) {
            const allPackages = await store.index();
            return res.status(200).json(allPackages);
        }

        const orQuery = Object.entries(filters)
            .filter(([_, value]) => value !== "")
            .map(([key, value]) => ({ [key]: { $regex: value, $options: 'i' } })); // Case-insensitive regex
        // @ts-ignore
        const packages = await store.index({ $or: orQuery });
        res.status(200).json(packages);
    } catch (err: Error | any) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

export const showController = async (req: Request, res: Response) => {
    try {
        const packageData = await store.show(req.params.id);
        if (!packageData) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json(packageData);
    } catch (err: Error | any) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

export const createController = async (req: Request, res: Response) => {
    try {
        const newPackage = await store.create(req.body);
        io.emit('package_created', { event: 'package_created', package: newPackage });
        res.status(201).json(newPackage);
    } catch (err: Error | any) {
        console.error(err);
        res.status(400).json({ message: 'Bad Request', error: err.message });
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
    } catch (err: Error | any) {
        console.error(err);
        res.status(400).json({ message: 'Bad Request', error: err.message });
    }
};


export const destroyController = async (req: Request, res: Response) => {
    try {
        const deletedPackage = await store.delete(req.params.id);
        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        io.emit('package_deleted', { event: 'package_deleted', package_id: req.params.id });
        res.status(200).json({ message: 'Package deleted successfully', deletedPackage });
    } catch (err: Error | any) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};