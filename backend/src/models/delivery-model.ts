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
    pickup_time: { type: Date },
    start_time: { type: Date },
    end_time: { type: Date },
    location: { type: Object },
    status: { type: String, enum: Object.values(DeliveryStatus), default: DeliveryStatus.Open, required: true }
});

const DeliveryModel: Model<Delivery> = mongoose.model('Delivery', deliverySchema);

export class DeliveryStore {
    async index(filters: Partial<Delivery> = {}): Promise<Delivery[]> {
        // @ts-ignore
        return DeliveryModel.find(filters);
    }

    async show(id: string): Promise<Delivery | null> {
        if (mongoose.isValidObjectId(id)) {
            return DeliveryModel.findById(id);
        } else {
            return DeliveryModel.findOne({ delivery_id: id });
        }
    }

    async create(deliveryData: Delivery): Promise<Delivery> {
        const newDelivery = new DeliveryModel(deliveryData);
        return await newDelivery.save();
    }

    async update(id: string, deliveryData: Partial<Delivery>): Promise<Delivery | null> {
        console.log("Update called with ID:", id);

        let updatedDelivery: Delivery | null = null;

        if (mongoose.isValidObjectId(id)) {
            // Update by _id if it's a valid ObjectId
            console.log("Updating by _id:", id);
            updatedDelivery = await DeliveryModel.findByIdAndUpdate(id, deliveryData, { new: true });
        } else {
            // Update by delivery_id if it's not an ObjectId
            console.log("Updating by delivery_id:", id);
            updatedDelivery = await DeliveryModel.findOneAndUpdate({ delivery_id: id }, deliveryData, { new: true });
        }

        if (!updatedDelivery) {
            console.log("No delivery found with the provided ID.");
            return null; // Return null to indicate no document was found
        }

        console.log("Delivery successfully updated:", updatedDelivery);
        return updatedDelivery;
    }

    async delete(id: string): Promise<Delivery | null> {
        if (mongoose.isValidObjectId(id)) {
            return DeliveryModel.findByIdAndDelete(id);
        } else {
            return DeliveryModel.findOneAndDelete({ delivery_id: id });
        }
    }
}