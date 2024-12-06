import { Request, Response } from 'express';
import Order from '../models/Order';
import { createRazorpayOrder } from '../services/RazorpayService';


export const createOrder = async (req: Request, res: Response) => {
    const { amount, currency, receipt } = req.body;

    try {
        const razorpayOrder = await createRazorpayOrder(amount, receipt);
        const newOrder = new Order({
            amount,
            currency,
            receipt,
            orderId: razorpayOrder.id,
            status: razorpayOrder.status,
        });

        await newOrder.save();

        res.json(razorpayOrder);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};
