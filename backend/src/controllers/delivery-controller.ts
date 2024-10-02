import { Request, Response } from 'express';
import {Delivery, DeliveryStore} from '../models/delivery-model';
import io from '../app'; // WebSocket

const store = new DeliveryStore();

export const indexController = async (req: Request, res: Response) => {
    try {
        const filters = req.query as Partial<Delivery>;
        const deliveries = await store.index(filters);
        res.status(200).json(deliveries);
    } catch (err: Error | any) {
        console.error('Error fetching deliveries:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};
export const showController = async (req: Request, res: Response) => {
    try {
        const delivery = await store.show(req.params.id);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.status(200).json(delivery);
    } catch (err: Error | any) {
        console.error('Error fetching delivery:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

export const createController = async (req: Request, res: Response) => {
    try {
        const newDelivery = await store.create(req.body);
        io.emit('delivery_created', { event: 'delivery_created', delivery: newDelivery });
        res.status(201).json(newDelivery);
    } catch (err: Error | any) {
        console.error('Error creating delivery:', err);
        res.status(400).json({ message: 'Error creating delivery', error: err.message });
    }
};

export const updateController = async (req: Request, res: Response) => {
    try {
        const updatedPackage = await store.update(req.params.id, req.body);
        if (!updatedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.status(200).json(updatedPackage);
    } catch (err: Error | any) {
        console.error(err);
        res.status(400).json({ message: 'Bad Request', error: err.message });
    }
};


export const destroyController = async (req: Request, res: Response) => {
    try {
        const deletedDelivery = await store.delete(req.params.id);
        if (!deletedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        io.emit('delivery_deleted', { event: 'delivery_deleted', delivery_id: req.params.id });
        res.status(200).json({ message: 'Delivery deleted successfully', delivery: deletedDelivery });
    } catch (err: Error | any) {
        console.error('Error deleting delivery:', err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};