import mongoose, { Document, Model } from 'mongoose';
import {DeliveryStatus, PackageStatus} from "../common/enums";


interface Dimensions {
    width: number;
    height: number;
    depth: number;
}
export interface Location {
    lat: number;
    lng: number;
}

export interface Package extends Document {
    description: string;
    weight: number;
    dimensions: Dimensions
    from_name: string;
    to_name: string;
    from_address: string;
    to_address: string;
    status: string;
    from_location: Location;
    to_location: Location;
}

const packageSchema = new mongoose.Schema<Package>({
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: {type : Object , "default" : { width: 0, height: 0, depth: 0 }, required: true},
    from_name: { type: String, required: true },
    from_address: { type: String, required: false },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
    status: { type: String, enum: Object.values(PackageStatus), default: PackageStatus.Created },
    from_location: { type: Object, required: true },
    to_location: { type: Object, required: true }
});

const PackageModel: Model<Package> = mongoose.model('Package', packageSchema);

export class PackageStore {
    async index(): Promise<Package[]> {
        return PackageModel.find();
    }

    async show(id: string): Promise<Package | null> {
        return PackageModel.findById(id);
    }

    async create(packageData: Package): Promise<Package> {
        const newPackage = new PackageModel(packageData);
        return await newPackage.save();
    }

    async update(id: string, packageData: Partial<Package>): Promise<Package | null> {
        return PackageModel.findByIdAndUpdate(id, packageData, {new: true});
    }

    async delete(id: string): Promise<Package | null> {
        return PackageModel.findByIdAndDelete(id);
    }
}