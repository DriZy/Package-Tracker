import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Forbidden: Invalid or missing authorization header' });
    }

    const token = authHeader.split(' ')[1];
    if (token !== 'some-secret-token') {
        return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    next();
};