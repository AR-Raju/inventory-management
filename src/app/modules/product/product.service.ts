import { IProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (student: IProduct) => {
  const result = await Product.create(student);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateSingleProductIntoDB = async (
  id: string,
  update: Partial<IProduct>
) => {
  const result = await Product.findByIdAndUpdate(id, update, { new: true });
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

const getProductsBySearchTermFromDB = async (searchPamams: string) => {
  // Define the search query using aggregation pipeline
  const products = await Product.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: new RegExp(searchPamams as string, "i") } },
          { description: { $regex: new RegExp(searchPamams as string, "i") } },
          { category: { $regex: new RegExp(searchPamams as string, "i") } },
        ],
      },
    },
  ]);

  return products;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductFromDB,
  getProductsBySearchTermFromDB,
};
