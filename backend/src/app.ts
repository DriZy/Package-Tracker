import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDB } from './common/db-connection';
import userRoutes from './routes/user-routes';
import packageRoutes from './routes/package-routes';
import deliveryRoutes from "./routes/delivery-routes";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to the database
connectToDB().then(r => console.log("Connected To MongoDB Successfully"));

// Define Routes
app.get('/', (req: Request, res: Response) => {
    res.send('Package Tracker API');
});

// Register Routes
userRoutes(app);
packageRoutes(app);
deliveryRoutes(app);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;