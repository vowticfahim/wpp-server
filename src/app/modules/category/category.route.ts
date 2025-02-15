import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { categoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";
import { TRole } from "../user/user.interface";
import { auth } from "../../middlewares/auth";

const router = Router();

// creating category
router.post(
  "/",
  auth(TRole.ADMIN),
  validateRequest(categoryValidation.createCategoryValidationSchema),
  CategoryController.createCategory
);

// getting all category
router.get("/", CategoryController.getAllCategory);

// getting single category
router.get("/:id", CategoryController.getSingleCategory);

// updating a category
router.patch(
  "/:id",
  auth(TRole.ADMIN),
  validateRequest(categoryValidation.updateCategoryValidationSchema),
  CategoryController.updateCategory
);

// deleting a category
router.delete("/:id", auth(TRole.ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router;
