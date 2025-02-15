import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import Product from "./product.model";
import { TProduct } from "./product.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { productSearchFields } from "./product.constant";

// creating product into db
const createProductIntoDB = async (payload: TProduct) => {
  const isProductExists = await Product.findOne({ name: payload.name });

  if (isProductExists) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, "Product is already exists");
  }
  const result = await Product.create(payload);
  return result;
};

// getting all product from db
const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    Product.find({ isDeleted: { $ne: true } }).populate("category"),
    query
  )
    .search(productSearchFields)
    .filter()
    .sort()
    .paginate();
  const data = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();
  return { data, meta };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id)
    .find({ isDeleted: { $ne: true } })
    .populate("category");
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const product = await Product.findById(id).find({ isDeleted: { $ne: true } });

  if (!product || product.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Product is deleted");
  }

  const updateProduct = await Product.findByIdAndUpdate(id, payload);

  const result = await Product.findById(updateProduct!._id);

  return result;
};

const deleteProductFromDB = async (id: string) => {
  const deletedProduct = await Product.findByIdAndUpdate(id, {
    isDeleted: true,
  });

  const result = await Product.findById(deletedProduct!._id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
