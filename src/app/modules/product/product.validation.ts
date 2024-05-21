import { z } from 'zod';

// Define the Zod schema for TVariant
const VariantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Define the Zod schema for TInventory
const InventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Define the Zod schema for TProduct
const ProductValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(VariantValidationSchema),
  inventory: InventoryValidationSchema,
});

// Export the Zod schemas
export default ProductValidationSchema;
