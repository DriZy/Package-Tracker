import { Request, Response, NextFunction } from 'express';

// Middleware to log requests
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} request for '${req.url}'`);
    next(); // Pass control to the next middleware or route handler
};

export default requestLogger;