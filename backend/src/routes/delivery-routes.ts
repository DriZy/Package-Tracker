import {Router} from 'express';
import {
    indexController,
    showController,
    createController,
    updateController,
    destroyController
} from '../controllers/delivery-controller';
import {jwtAuthMiddleware} from '../middleware/auth-middleware';


const deliveryRoutes = Router();

deliveryRoutes.get('/', jwtAuthMiddleware, indexController);
deliveryRoutes.get('/:id', jwtAuthMiddleware, showController);
deliveryRoutes.post('/new', jwtAuthMiddleware, createController);
deliveryRoutes.put('/:id', jwtAuthMiddleware, updateController);
deliveryRoutes.delete('/:id', jwtAuthMiddleware, destroyController);

export default deliveryRoutes;