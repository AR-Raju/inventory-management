import { Product } from "../product/product.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderIntoDB = async (orderData: IOrder) => {
  const { productId, quantity } = orderData;

  const product = await Product.findOne({ _id: productId });

  // Check if product is found
  if (!product) {
    throw new Error("Product not found");
  }

  // Check if there is enough inventory
  if (product.inventory.quantity < quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }

  // Reduce the inventory quantity
  product.inventory.quantity -= quantity;

  // Update the inStock property based on the new quantity
  product.inventory.inStock = product.inventory.quantity > 0;

  await product.save();

  const result = await Order.create(orderData);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = Order.find();
  return result;
};

const getOrderByEmailFromDB = async (email: string) => {
  if (!email) {
    throw new Error("Email parameter is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format");
  }

  const result = await Order.find({ email: email }).exec();
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrderByEmailFromDB,
};
