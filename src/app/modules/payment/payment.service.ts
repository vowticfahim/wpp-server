import { join } from "path";
import { readFileSync } from "fs";
import Order from "../order/order.model";
import { TProduct } from "../product/product.interface";
import Product from "../product/product.model";

const confirmationService = async (transactionId: string, status: string) => {
  let message = "";
  const result = await Order.findOne({ transactionId }).populate({
    path: "products.productId",
    model: "product",
    populate: {
      path: "category",
      model: "category",
    },
  });

  if (!result) {
    throw new Error("Order not found");
  }

  const productIds = result.products.map(
    (product) => (product.productId as unknown as TProduct)._id
  );

  if (status === "success") {
    if (result.paymentStatus === "pending") {
      // Update stock for each product
      for (const product of result.products) {
        const populatedProduct = product.productId as unknown as TProduct;
        await Product.findByIdAndUpdate(populatedProduct._id, {
          $inc: { stockQuantity: -product.quantity },
        });
      }
    }

    // Update the order payment status
    await Order.findOneAndUpdate({ transactionId }, { paymentStatus: "paid" });
    message = "Successfully Paid ✅";
  } else if (status === "failed") {
    message = "Payment Failed ❌";
  } else {
    await Order.findOneAndUpdate(
      { transactionId },
      { paymentStatus: "canceled" }
    );
    message = "Payment Canceled ❌";
  }

  // Load and populate HTML template
  const filePath = join(__dirname, "../../../views/confirmation.html");
  let template = readFileSync(filePath, "utf-8");

  // Generate product table rows
  let productsTable = "";
  for (const product of result.products) {
    const populatedProduct = product.productId as unknown as TProduct;
    productsTable += `<tr>
        <td>${populatedProduct.name} (${
      populatedProduct.price
    }) &nbsp; x &nbsp;${product.quantity}</td>    
        <td>${populatedProduct.price * product.quantity}</td>    
    </tr>`;
  }

  const serviceChargeTable = `<tr><td>Delivery Charge</td><td>${result.deliveryCharge}</td></tr>`;

  const priceWithCharge =
    Number(result.totalPrice) + Number(result.deliveryCharge);

  template = template.replace("{{message}}", message);
  template = template.replace("{{trxId}}", transactionId);
  template = template.replace("{{productDetail}}", productsTable);
  template = template.replace("{{serviceCharge}}", serviceChargeTable);
  template = template.replace("{{cost}}", `${priceWithCharge}`);

  return template;
};

export const paymentServices = { confirmationService };
