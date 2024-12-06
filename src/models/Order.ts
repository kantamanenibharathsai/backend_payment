import mongoose, { Document, Schema, model } from 'mongoose';

// Interface for Order document
export interface IOrder extends Document {
    amount: number; // Amount in paise (smallest currency unit)
    currency: string;
    receipt: string;
    paymentStatus: 'created' | 'failed' | 'successful'; // Enum for payment status
    orderId: string; // Razorpay Order ID
    createdAt: Date;
    updatedAt: Date;
    paymentId?: string;
}

// Mongoose schema for Order
const OrderSchema: Schema = new Schema<IOrder>(
    {
        amount: {
            type: Number,
            required: true,
        },
        paymentId: { type: String },
        currency: {
            type: String,
            required: true,
            default: 'INR',
        },
        receipt: {
            type: String,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['created', 'failed', 'successful'],
            default: 'created',
            required: true,
        },
        orderId: {
            type: String,
            required: true,
            unique: true, // Ensures the order ID is unique
        },
    },
    {
        timestamps: true, // Automatically creates createdAt and updatedAt fields
    }
);

// Create and export Mongoose model for Order
const Order = model<IOrder>('Order', OrderSchema);

export default Order;
