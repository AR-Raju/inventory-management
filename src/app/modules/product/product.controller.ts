import { Request, Response } from "express";
import { productServices } from "./product.service";
import ProductValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // data validation using zod
    const zodParsedData = ProductValidationSchema.parse(productData);

    // will call service func to send this data
    const result = await productServices.createProductIntoDB(zodParsedData);

    // Check if the product was found and updated
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // send response
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      errorMessage: err,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsFromDB();

    // Check if the product was found and updated
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      errorMessage: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductFromDB(productId);

    // Check if the product was found and updated
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      errorMessage: err,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;

    // data validation using zod
    const zodParsedData = ProductValidationSchema.parse(updatedProduct);

    const result = await productServices.updateSingleProductIntoDB(
      productId,
      zodParsedData
    );

    // Check if the product was found and updated
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      errorMessage: err,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productServices.deleteSingleProductFromDB(productId);

    // Check if the product was found and updated
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      errorMessage: err,
    });
  }
};

const getProductsBySearchTerm = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    const products = await productServices.getProductsBySearchTermFromDB(
      searchTerm as string
    );

    // Check if the product was found and updated
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: products,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong!",
      errorMessage: err,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  getProductsBySearchTerm,
};
