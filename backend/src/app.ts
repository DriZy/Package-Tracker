import express from 'express';
import mongoose from 'mongoose';
import { PackageRouter } from './package-controller';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

console.log(process.env.MONGO_URI);

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://package_tracker-mongodb:27017/package_tracker';

mongoose.connect(mongoUri).then((response) => {
    console.log('Connected to MongoDB', response.Collection);
}).catch((error) => { console.error('Error connecting to MongoDB', error); });

app.use('/api/package', PackageRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export { app };