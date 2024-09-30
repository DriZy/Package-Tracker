import { Router } from 'express';
import {
    authenticateController,
    createController,
    destroyController,
    indexController,
    showController
} from '../controllers/user-controller';
import { jwtAuthMiddleware } from '../middleware/auth-middleware';

const userRoutes = Router();

userRoutes.post('/signup', createController);
userRoutes.post('/login', authenticateController);
userRoutes.get('/', jwtAuthMiddleware, indexController);
userRoutes.get('/:id', jwtAuthMiddleware, showController);
userRoutes.delete('/:id', jwtAuthMiddleware, destroyController);

export default userRoutes;