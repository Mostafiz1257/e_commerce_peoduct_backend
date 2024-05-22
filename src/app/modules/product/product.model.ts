
import  { Schema,  model } from 'mongoose';
import { TInventory, TProduct, TVariant } from './product.interface';

// Define the Mongoose schema for TVariant
const VariantSchema = new Schema<TVariant>({
  type: { type: String, required: true },
  value: { type: String, required: true }
});

// Define the Mongoose schema for TInventory
const InventorySchema = new Schema<TInventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true }
});

// Define the Mongoose schema for TProduct
const productSchema = new Schema<TProduct>({
  name: { type: String,required:true },
  description: { type: String ,required:true},
  price: { type: Number ,required:true},
  category: { type: String ,required:true},
  tags: { type: [String] ,required:true},
  variants: { type: [VariantSchema] ,required:true},
  inventory: { type: InventorySchema ,required:true}
});

export const ProductModel  = model<TProduct>('product', productSchema)
