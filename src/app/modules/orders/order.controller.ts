import { Request, Response } from 'express';
import { OrderServices } from './order.service';
import { TOrders } from './order.interface';
import OrderValidationSchema from './order.validation';
import { ProductModel } from '../product/product.model';

//Create a order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData: TOrders = req.body;
    const orderZodParse = OrderValidationSchema.parse(orderData);
    const product = await ProductModel.findById(orderZodParse.productId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: 'No data found with this product id',
      });
    }
    if (product.inventory.quantity < orderZodParse.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough product quantity in stock',
      });
    }

    //create order into DB
    const result = await OrderServices.createOrderIntoDB(orderZodParse);
    product.inventory.quantity -= orderZodParse.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Your id is not matching with product id',
    });
  }
};


//Get order
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const result = await OrderServices.getAllOrderFromDB(email);

    res.status(200).json({
      success: true,
      message: 'Successfully retrieved data',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve data',
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
