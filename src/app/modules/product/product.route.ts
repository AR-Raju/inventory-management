import express, { Request, Response } from "express";
import { productControllers } from "./product.controller";

const router = express.Router();

router.post("/", productControllers.createProduct);
router.get("/:productId", productControllers.getSingleProduct);
router.put("/:productId", productControllers.updateSingleProduct);
router.delete("/:productId", productControllers.deleteSingleProduct);

// Define a single route for both getAllProducts and getProductsBySearchTerm
router.get("/", (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  if (searchTerm) {
    return productControllers.getProductsBySearchTerm(req, res);
  } else {
    return productControllers.getAllProducts(req, res);
  }
});

export const productRoutes = router;
