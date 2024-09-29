import { Request, Response } from 'express';
import { DeliveryStore } from '../models/delivery-model';
import io from '../app'; // WebSocket

const store = new DeliveryStore();

export const indexController = async (req: Request, res: Response) => {
    try {
        const deliveries = await store.index();
        res.json(deliveries);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const showController = async (req: Request, res: Response) => {
    try {
        const delivery = await store.show(req.params.id);
        if (!delivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.json(delivery);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const createController = async (req: Request, res: Response) => {
    try {
        const newDelivery = await store.create(req.body);
        io.emit('delivery_created', { event: 'delivery_created', delivery: newDelivery });
        res.status(201).json(newDelivery);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const updateController = async (req: Request, res: Response) => {
    try {
        const updatedDelivery = await store.update(req.params.id, req.body);
        if (!updatedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        io.emit('delivery_updated', { event: 'delivery_updated', delivery: updatedDelivery });
        res.status(200).json(updatedDelivery);
    } catch (err) {
        res.status(400).json(err);
    }
};

export const destroyController = async (req: Request, res: Response) => {
    try {
        const deletedDelivery = await store.delete(req.params.id);
        if (!deletedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        io.emit('delivery_deleted', { event: 'delivery_deleted', delivery_id: req.params.id });
        res.status(200).json(deletedDelivery);
    } catch (err) {
        res.status(500).json(err);
    }
};