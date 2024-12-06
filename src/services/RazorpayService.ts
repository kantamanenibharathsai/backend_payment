import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_1A3XsuJLuaxI2r',
    key_secret: "uv5HcrdVAV4IUsqsrm0EYHIq",
});

export const createRazorpayOrder = async (amount: number, receipt: string) => {
    const options = {
        amount: Number(amount * 100), // amount in the smallest currency unit
        currency: 'INR',
        receipt: crypto.randomBytes(10).toString("hex"),
    };

    return razorpayInstance.orders.create(options);
};
