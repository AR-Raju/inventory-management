import { Request, Response } from "express";
import { orderServices } from "./order.service";
import OrderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderBody = req.body;

    // validate data with zod vlaidation
    const parsedData = OrderValidationSchema.parse(orderBody);
    const createdOrder = await orderServices.createOrderIntoDB(parsedData);

    // Check if the product was found and updated
    if (!createdOrder) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // send response
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: createdOrder,
    });
  } catch (err: any) {
    let errorMessage = err.message || "Something went wrong!";

    if (typeof err.message === "string") {
      try {
        errorMessage = JSON.parse(err.message);
      } catch (parseError) {
        errorMessage = "Something went wrong!";
      }
    }

    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const ordersData = await orderServices.getAllOrdersFromDB();

    // Check if the product was found and updated
    if (!ordersData) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // send response
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: ordersData,
    });
  } catch (err: any) {
    let errorMessage = err.message || "Something went wrong!";

    if (typeof err.message === "string") {
      try {
        errorMessage = JSON.parse(err.message);
      } catch (parseError) {
        errorMessage = "Something went wrong!";
      }
    }

    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

const getOrderByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    const ordersData = await orderServices.getOrderByEmailFromDB(
      email as string
    );

    // Check if the product was found and updated
    if (!ordersData) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (ordersData.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No orders found for the provided email",
        data: [],
      });
    }

    // send response
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: ordersData,
    });
  } catch (err: any) {
    let errorMessage = err.message || "Something went wrong!";

    if (typeof err.message === "string") {
      try {
        errorMessage = JSON.parse(err.message);
      } catch (parseError) {
        errorMessage = "Something went wrong!";
      }
    }

    res.status(400).json({
      success: false,
      message: errorMessage,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrders,
  getOrderByEmail,
};
