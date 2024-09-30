import mongoose, { Document, Model } from 'mongoose';

interface Dimensions {
    width: number;
    height: number;
    depth: number;
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
}

const packageSchema = new mongoose.Schema<Package>({
    description: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        depth: { type: Number, required: true },
    },
    from_name: { type: String, required: true },
    from_address: { type: String, required: true },
    to_name: { type: String, required: true },
    to_address: { type: String, required: true },
    status: { type: String, default: 'created' } // status: created, in-transit, delivered
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