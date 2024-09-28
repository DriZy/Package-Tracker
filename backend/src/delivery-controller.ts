import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { io } from './app';
import {DeliveryStatus} from "./common/enums";

// Define Delivery Schema
const DeliverySchema = new mongoose.Schema<any>({
    delivery_id: { type: String, default: uuidv4 },
    package_id: { type: String, required: true },
    pickup_time: { type: Date },
    start_time: { type: Date },
    end_time: { type: Date },
    location: { lat: { type: Number }, lng: { type: Number } },
    status: { type: String, enum: Object.values(DeliveryStatus), default: DeliveryStatus.Open }
});

const Delivery = mongoose.model('Delivery', DeliverySchema);
const router = Router();

// Create a new delivery
router.post('/', async (req: Request, res: Response) => {
    try {
        const deliveryData = new Delivery(req.body);
        await deliveryData.save();
        io.emit('delivery_created', { event: 'delivery_created', delivery: deliveryData });
        res.status(201).json(deliveryData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create delivery', error });
    }
});

// Get all deliveries
router.get('/', async (req: Request, res: Response) => {
    try {
        const deliveries = await Delivery.find();
        res.status(200).json(deliveries);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch deliveries', error });
    }
});

// Get delivery by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const deliveryData = await Delivery.findById(req.params.id);
        if (!deliveryData) {
            return res.status(404).json({ message: 'Delivery not found' });
        }
        res.status(200).json(deliveryData);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch delivery', error });
    }
});

// Update a delivery
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDelivery) {
            return res.status(404).json({ message: 'Delivery not found' });
        }

        if (req.body.status === 'picked-up') updatedDelivery.pickup_time = new Date();
        if (req.body.status === 'in-transit') updatedDelivery.start_time = new Date();
        if (['delivered', 'failed'].includes(req.body.status)) updatedDelivery.end_time = new Date();

        await updatedDelivery.save();
        io.emit('delivery_updated', { event: 'delivery_updated', delivery: updatedDelivery });
        res.status(200).json(updatedDelivery);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update delivery', error });
    }
});

// Delete a delivery
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deliveryData = await Delivery.findByIdAndDelete(req.params.id); if (!deliveryData) {
            return res.status(404).json({ message: 'Delivery not found' }); }
        io.emit('delivery_deleted', {
            event: 'delivery_deleted', delivery_id: req.params.id });
        res.status(200).json({ message: 'Delivery deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete delivery', error }); }
});

export const DeliveryRouter = router;