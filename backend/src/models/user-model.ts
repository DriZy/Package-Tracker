import mongoose, { Document, Model } from 'mongoose';
import { compareString, hashString } from "../utils/bcrypt";
import {DeliveryStatus, UserRoles} from "../common/enums";

export interface User extends Document {
    id?: number;
    username: string;
    password: string;
    role: 'customer' | 'driver' | 'admin';
    email?: string;
}

const userSchema = new mongoose.Schema<User>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRoles), default: UserRoles.Customer },
    email: { type: String, required: false }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await hashString(this.password);
    next();
});

const UserModel: Model<User> = mongoose.model('User', userSchema);

export class UserStore {
    async index(): Promise<User[]> {
        return UserModel.find();
    }

    async show(id: string): Promise<User | null> {
        return UserModel.findById(id);
    }

    async create(user: User): Promise<User> {
        const newUser = new UserModel(user);
        return await newUser.save();
    }

    async delete(id: string): Promise<User | null> {
        return UserModel.findByIdAndDelete(id);
    }

    async authenticate(username: string, password: string): Promise<User | null> {
        const user = await UserModel.findOne({ username });
        if (user && await compareString(password, user.password)) {
            return user;
        }
        return null;
    }
}