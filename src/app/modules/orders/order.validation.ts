import { z } from 'zod';

// Define the Zod schema for TOrders
const OrderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

export default OrderValidationSchema ;
