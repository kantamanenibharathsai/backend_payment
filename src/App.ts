import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import paymentRoutes from './routes/PaymentRoutes';

// Load environment variables from .env file
dotenv.config();

// Create an instance of Express
const app: Application = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging Middleware (optional for debugging)
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/payments', paymentRoutes);

// Health check endpoint (to ensure the server is running)
app.get('/', (req: Request, res: Response) => {
    res.send('Server is up and running');
});

// MongoDB connection
const mongoURI: string = process.env.MONGODB_URI || '';

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB successfully.');
    })
    .catch((err) => {
        console.error(`Failed to connect to MongoDB: ${err.message}`);
    });

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

export default app;
