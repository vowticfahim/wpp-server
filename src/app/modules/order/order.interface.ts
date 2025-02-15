export type TOrderProducts = {
  productId: string;
  quantity: number;
};

export type TOrder = {
  userId?: string;
  transactionId: string;
  orderStatus: "processing" | "shipping" | "canceled" | "completed";
  products: TOrderProducts[];
  totalPrice: {
    type: number;
    required: true;
  };
  paymentStatus?: "pending" | "due" | "processing" | "paid" | "canceled";
  city: string;
  deliveryCharge: number;
  deliveryMethod: "express" | "standard" | "pickup";
  email: string;
  manualPaymentMethod?: "bkash" | "nagad";
  manualPaymentPhone?: string;
  moneySent?: string;
  name: string;
  paymentMethod: "manual" | "automatic";
  phone: string;
  postalCode: string;
  shippingAddress: string;
};

