import express, { Request, Response } from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.post("/", orderController.createOrder);

// Define a single route for both getAllOrders and getOrderByEmail
router.get("/", (req: Request, res: Response) => {
  const { email } = req.query;
  if (email) {
    return orderController.getOrderByEmail(req, res);
  } else {
    return orderController.getAllOrders(req, res);
  }
});

export const orderRoutes = router;
