import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import httpStatus from "http-status";
import { CategoryServices } from "./category.service";

// creating user
const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDB(req.body);



  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category created successfully!",
    data: result,
  });
});

// getting all user data
const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDB();


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Category retrieved successfully!",
    data: result,
  });
});


// getting a single user data using id
const getSingleCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getSingleCategoryFromDB(req.params.id);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category retrieved successfully!",
    data: result,
  });
});


// updating a single user data using id and it's new data
const updateCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.updateCategoryIntoDB(req.params.id, req.body);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category updated successfully!",
    data: result,
  });
});

// deleting a single user  using id
const deleteCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.deleteCategoryFromDB(req.params.id);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category deleted successfully!",
    data: result,
  });
});


// exporting all controllers
export const CategoryController = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory
  
};
