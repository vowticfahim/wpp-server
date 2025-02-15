import { model, Schema } from "mongoose";
import { TOrder, TOrderProducts } from "./order.interface";

// Define the OrderProducts schema
const orderProductsSchema = new Schema<TOrderProducts>({
  productId: { type: String, ref: "product", required: true },
  quantity: { type: Number, required: true },
});

// Define the Order schema
const orderSchema = new Schema<TOrder>({
  userId: {
    type: String,
    ref: "user",
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["processing", "shipping", "completed", "canceled"],
    default: "processing"
  },
  products: [orderProductsSchema],
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "due", "verifying", "pending", "canceled"],
    default: "pending",
  },
  transactionId: {
    type: String,
    required: true,
    unique: true, 
  },
  city: {
    type: String,
    required: true,
  },
  deliveryCharge: {
    type: Number,
    required: true,
  },
  deliveryMethod: {
    type: String,
    enum: ["express", "standard", "pickup"],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  manualPaymentMethod: {
    type: String,
    enum: ["bkash", "nagad"],
    required: false,
  },
  manualPaymentPhone: {
    type: String,
    required: false,
  },
  moneySent: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["manual", "automatic"],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
});

// Create the model for the Order schema
const Order = model<TOrder>("Order", orderSchema);

export default Order;
