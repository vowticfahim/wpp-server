import { z } from "zod";

const orderValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    transactionId: z
      .string()
      .nonempty({ message: "Transaction ID is required" }),
    products: z
      .array(
        z.object({
          productId: z.string().nonempty({ message: "Product ID is required" }),
          quantity: z
            .number()
            .min(1, { message: "Quantity must be at least 1" })
            .int({ message: "Quantity must be an integer" }),
        })
      )
      .nonempty({ message: "At least one product is required" }),
    totalPrice: z.object({
      type: z.number().min(0, { message: "Total price cannot be negative" }),
      required: z.literal(true, { message: "Total price is required" }),
    }),
    paymentStatus: z.enum(["paid", "pending", "canceled"]).default("pending"),
    city: z.string().nonempty({ message: "City is required" }),
    deliveryCharge: z
      .number()
      .min(0, { message: "Delivery charge cannot be negative" }),
    deliveryMethod: z.enum(["express", "standard", "pickup"]),
    email: z.string().email({ message: "Invalid email format" }),
    manualPaymentMethod: z.enum(["bkash", "nagad"]).optional(),
    manualPaymentPhone: z.string().optional(),
    moneySent: z.string().optional(),
    name: z.string().nonempty({ message: "Name is required" }),
    paymentMethod: z.enum(["manual", "automatic"]),
    phone: z.string().nonempty({ message: "Phone number is required" }),
    postalCode: z.string().nonempty({ message: "Postal code is required" }),
    shippingAddress: z
      .string()
      .nonempty({ message: "Shipping address is required" }),
  }),
});

export { orderValidationSchema };
