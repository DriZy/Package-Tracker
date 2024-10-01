import mongoose, { Document, Model } from 'mongoose';
import {v4 as uuidv4} from "uuid";
import {DeliveryStatus} from "../common/enums";

export interface Delivery extends Document {
    delivery_id: string;
    package_id: string;
    pickup_time?: Date;
    start_time?: Date;
    end_time?: Date;
    location:Location;
    status: string;
}

const deliverySchema = new mongoose.Schema<Delivery>({
    delivery_id: { type: String, default: uuidv4 },
    package_id: { type: String, required: true },
    pickup_time: { type: Date, required: true },
    start_time: { type: Date },
    end_time: { type: Date },
    location: { type: Object },
    status: { type: String, enum: Object.values(DeliveryStatus), default: DeliveryStatus.Open }
});

const DeliveryModel: Model<Delivery> = mongoose.model('Delivery', deliverySchema);

export class DeliveryStore {
    async index(filters: Partial<Delivery> = {}): Promise<Delivery[]> {
        // @ts-ignore
        return DeliveryModel.find(filters);
    }

    async show(delivery_id: string): Promise<Delivery | null> {
        console.log(delivery_id)
        return DeliveryModel.findById(delivery_id);
    }

    async create(deliveryData: Delivery): Promise<Delivery> {
        const newDelivery = new DeliveryModel(deliveryData);
        return await newDelivery.save();
    }

    async update(id: string, deliveryData: Partial<Delivery>): Promise<Delivery | null> {
        return DeliveryModel.findByIdAndUpdate(id, deliveryData, {new: true});
    }

    async delete(id: string): Promise<Delivery | null> {
        return DeliveryModel.findByIdAndDelete(id);
    }
}