import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const apiToken = req.headers['authorization'];

    if (!apiToken) {
        return res.status(401).json({ message: 'Unauthorized: Missing API token' });
    }

    try {
        const isMatch = await bcrypt.compare(apiToken, process.env.API_SECRET_HASH || '');
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Unauthorized: Invalid API token' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};