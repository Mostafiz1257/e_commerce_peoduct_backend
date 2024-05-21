import { TOrders } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: TOrders) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrderFromDB = async (email: string) => {
  if (email) {
    const result = await OrderModel.find({ email });
    return result;
  } else {
    const result = await OrderModel.find();
    return result;
  }
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrderFromDB,

};
