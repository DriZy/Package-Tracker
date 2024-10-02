import express, {Router} from 'express';
import {
    createController,
    indexController,
    showController,
    updateController,
    destroyController
} from '../controllers/package-controller';
import {jwtAuthMiddleware} from '../middleware/auth-middleware';

const packageRoutes = Router();

packageRoutes.post('/new', jwtAuthMiddleware, createController);
packageRoutes.get('/', jwtAuthMiddleware, indexController);
packageRoutes.get('/:id', jwtAuthMiddleware, showController);
packageRoutes.put('/:id', jwtAuthMiddleware, updateController);
packageRoutes.delete('/:id', jwtAuthMiddleware, destroyController);

export default packageRoutes;