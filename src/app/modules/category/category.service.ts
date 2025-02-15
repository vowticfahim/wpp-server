import AppError from "../../errors/AppError";
import { TCategory } from "./category.interface";
import Category from "./category.model";
import httpStatus from "http-status";

const createCategoryIntoDB = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};
const getAllCategoryFromDB = async () => {
  const result = await Category.find({ isDeleted: { $ne: true } });
  return result;
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id).find({ isDeleted: { $ne: true } });
  return result;
};

const updateCategoryIntoDB = async (id: string, payload: Partial<TCategory>) => {
  const category = await Category.findById(id).find({ isDeleted: { $ne: true } });

  if (!category || category.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "Category is deleted");
  }

  const updatedcategory = await Category.findByIdAndUpdate(id, payload);

  const result = await Category.findById(updatedcategory!._id);

  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const deletedCategory = await Category.findByIdAndUpdate(id, { isDeleted: true });

  const result = await Category.findById(deletedCategory!._id);
  return result;
};

export const CategoryServices = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
