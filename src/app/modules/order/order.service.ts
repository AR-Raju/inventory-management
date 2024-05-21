import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: IOrder) => {
  const result = Order.create(orderData);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = Order.find();
  return result;
};

const getOrderByEmailFromDB = async (email: string) => {
  const result = await Order.find({ email: email.toLowerCase() });
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrderByEmailFromDB,
};
