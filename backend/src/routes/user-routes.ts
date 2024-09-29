import { Application } from "express";
import {
    authenticateController,
    createController,
    destroyController,
    indexController,
    showController
} from "../controllers/user-controller";
import {verifyAuthToken} from "../utils/auth";

const userRoutes = (app: Application) => {
    app.post('/users', createController);
    app.get('/users', verifyAuthToken, indexController);
    app.get('/users/:id', verifyAuthToken, showController);
    app.delete('/users/:id', verifyAuthToken, destroyController);
    app.post('/users/auth', authenticateController);
};

export default userRoutes;