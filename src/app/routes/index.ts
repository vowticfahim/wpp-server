import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { ProductRoutes } from "../modules/product/product.route";
import { OrderRoutes } from "../modules/order/order.route";
import { paymentRoutes } from "../modules/payment/payment.route";

const router = Router();

const routes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/user", route: UserRoutes },
  { path: "/category", route: CategoryRoutes },
  { path: "/product", route: ProductRoutes },
  { path: "/order", route: OrderRoutes },
  { path: "/payment", route: paymentRoutes },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
