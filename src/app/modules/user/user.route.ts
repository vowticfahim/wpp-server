import { Router } from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { TRole } from "./user.interface";

const router = Router();

// creating user
router.post(
  "/user-create",
  validateRequest(userValidation.createUserValidationSchema),
  UserController.createUser
);

// creating user by admin
router.post(
  "/admin-create",
  auth(TRole.ADMIN),
  validateRequest(userValidation.createUserByAdminValidationSchema),
  UserController.createUserByAdmin
);

// getting all user
router.get("/", auth(TRole.ADMIN), UserController.getAllUser);

// getting single user
router.get("/:id", auth(TRole.ADMIN, TRole.USER), UserController.getSingleUser);

// updating a user
router.patch(
  "/:id",
  auth(TRole.ADMIN, TRole.USER),
  validateRequest(userValidation.updateUserValidationSchema),
  UserController.updateUser
);

// updating a user
router.delete(
  "/:id",
  auth(TRole.ADMIN),
  UserController.deleteUser
);

export const UserRoutes = router;
