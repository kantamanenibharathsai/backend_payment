import express from 'express';
import { createOrder } from '../controllers/PaymentController';

const router = express.Router();

router.post('/create-order', createOrder);

export default router;
