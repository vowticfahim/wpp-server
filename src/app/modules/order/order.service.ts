import { Request } from "express";
import Product from "../product/product.model";
import { TOrderProducts } from "./order.interface";
import User from "../user/user.model";
import { initiatePayment } from "../payment/payment.utils";
import Order from "./order.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createOrderIntoDb = async (req: Request) => {
  let result = null;
  let paymentResponse = "";
  const userId = req?.user?.userId;
  const orderInfo = req.body;

  //   finding user
  const user = await User.findById(userId);

  // getting all products from backend using id
  const products = await Product.find({
    $or: req.body.products.map((product: TOrderProducts) => ({
      _id: product.productId,
    })),
  });

  // caculating total price from backend
  const totalPrice = req.body.products.reduce(
    (acc: number, product: TOrderProducts) => {
      const matchedProduct = products.find(
        (p) => p._id.toString() === product.productId
      );

      return matchedProduct
        ? acc + matchedProduct.price * product.quantity
        : acc;
    },
    0
  );

  // assinging userId and calculating totalPrice after delivery charge
  orderInfo.userId = userId;
  orderInfo.totalPrice = totalPrice + orderInfo.deliveryCharge;

  if (orderInfo.paymentMethod === "manual") {
    result = await Order.create(orderInfo);
  }

  if (orderInfo.paymentMethod === "automatic") {
    const transactionId = `TXN-${Date.now()}`;
    const paymentData = {
      transactionId,
      totalPrice: orderInfo.totalPrice,
      customerName: orderInfo.name,
      customerEmail: orderInfo?.email,
      customerPhone: orderInfo?.phone,
      customerAddress: orderInfo?.address,
    };

    paymentResponse = await initiatePayment(paymentData);

    result = await Order.create({
      userId,
      transactionId,
      ...req.body,
      totalPrice,
    });
  }


  return { result, paymentResponse };
};

const getAllOrderFromDb = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(
    Order.find({ isDeleted: { $ne: true } }).populate("productId"),
    query
  )
    .search(["productId", "name", "description", "transactionId"])
    .filter()
    .sort()
    .paginate();

  const data = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();
  return { data, meta };
};

export const OrderServices = {
  createOrderIntoDb,
  getAllOrderFromDb,
};
