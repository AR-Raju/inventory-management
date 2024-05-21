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
    // Update the inStock property if needed
    if (product.inventory.inStock) {
      product.inventory.inStock = false;
      await product.save();
    }

    throw new Error("Insufficient quantity available in inventory");
  }

  // Reduce the inventory quantity
  product.inventory.quantity -= quantity;

  // Update the inStock property if quantity goes to zero
  if (product.inventory.quantity === 0) {
    product.inventory.inStock = false;
  }

  await product.save();

  const result = await Order.create(orderData);
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
