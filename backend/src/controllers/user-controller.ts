import { Request, Response } from 'express';
import { User, UserStore } from '../models/user-model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const store = new UserStore();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const indexController = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(401).json(err);
    }
};

export const showController = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(404).json(err);
    }
};

export const createController = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const user: User = {
            username: req.body.username,
            password: req.body.password,
        };
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(400).json(err);
    }
};

export const destroyController = async (req: Request, res: Response) => {
    try {
        const deletedUser = await store.delete(req.params.id);
        res.json(deletedUser);
    } catch (err) {
        res.status(401).json(err);
    }
};

export const authenticateController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await store.authenticate(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ user }, JWT_SECRET);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error });
    }
};