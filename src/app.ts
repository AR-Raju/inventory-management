import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import { orderRoutes } from "./app/modules/order/order.route";
import { productRoutes } from "./app/modules/product/product.route";
const app: Application = express();

// Middleware to log requests
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("Received request:", req.method, req.url);
//   console.log("Before express.json() Request body:", req.body);
//   next();
// });

// parser
app.use(express.json());
app.use(cors());

// Middleware to log requests
// app.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("Received request:", req.method, req.url);
//   console.log("After express.json() Request body:", req.body);
//   next();
// });

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
