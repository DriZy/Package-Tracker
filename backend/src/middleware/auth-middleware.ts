import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

//@ts-ignore
interface AuthRequest extends Request {
    user?: string | object;
}

export const jwtAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader)

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token format' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
        //@ts-ignore
    } catch (error) {
        //@ts-ignore
        return res.status(403).json({ message: 'Forbidden: Invalid token', error: error.message });
    }
};