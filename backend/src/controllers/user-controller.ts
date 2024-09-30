import { Request, Response } from 'express';
import { User, UserStore } from '../models/user-model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();
const jwtSecret = process.env.JWT_SECRET || 'YourJWTSecret';
const saltRounds = parseInt(process.env.BCRYPT_SALT || '10', 10);
// Get all users
export const indexController = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.status(200).json(users);
    } catch (err: Error | any) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
};

export const showController = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' }); // Respond with 404 Not Found
        }
        res.status(200).json(user);
    } catch (err: Error | any) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
};

export const createController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // @ts-ignore
        const user: User = {
            username,
            password
        };

        const newUser = await store.create(user);

        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const token = jwt.sign({ user: newUser }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (err: any) {
        // Handle specific error cases, if any
        if (err.code === 11000) { // Duplicate key error in MongoDB
            return res.status(400).json({ message: 'Username already exist' });
        }

        // Send a more generic error response
        res.status(500).json({ message: 'Failed to create user', error: err.message });
    }
};

export const destroyController = async (req: Request, res: Response) => {
    try {
        const deletedUser = await store.delete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' }); // Respond with 404 Not Found
        }
        res.status(200).json({ message: 'User deleted successfully', user: deletedUser }); // Respond with 200 OK
    } catch (err: Error | any) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Failed to delete user', error: err.message });
    }
};

// Authenticate a user
export const authenticateController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await store.authenticate(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ user }, jwtSecret);
        res.status(200).json({ token });
    } catch (err: Error | any) {
        console.error('Error authenticating user:', err);
        res.status(500).json({ message: 'Failed to authenticate user', error: err.message });
    }
};