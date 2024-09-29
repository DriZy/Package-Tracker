import {Application} from 'express';
import { indexController, showController, createController, updateController, destroyController } from '../controllers/delivery-controller';
import { verifyAuthToken } from '../utils/auth';

const deliveryRoutes = (app: Application) => {
    app.get('/deliveries', verifyAuthToken, indexController);
    app.get('/deliveries/:id', verifyAuthToken, showController);
    app.post('/deliveries', verifyAuthToken, createController);
    app.put('/deliveries/:id', verifyAuthToken, updateController);
    app.delete('/deliveries/:id', verifyAuthToken, destroyController);
};

export default deliveryRoutes;