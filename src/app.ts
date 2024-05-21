import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { orderRoutes } from "./app/modules/order/order.route";
import { productRoutes } from "./app/modules/product/product.route";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Route not found (404) handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});

export default app;
