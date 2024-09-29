import { Application } from 'express';
import { indexController, showController, createController, updateController, destroyController } from '../controllers/package-controller';
import { verifyAuthToken } from '../utils/auth';

const packageRoutes = (app: Application) => {
    app.get('/packages', verifyAuthToken, indexController);
    app.get('/packages/:id', verifyAuthToken, showController);
    app.post('/packages', verifyAuthToken, createController);
    app.put('/packages/:id', verifyAuthToken, updateController);
    app.delete('/packages/:id', verifyAuthToken, destroyController);
};

export default packageRoutes;