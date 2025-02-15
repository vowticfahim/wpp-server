import { Types } from "mongoose";

export type TProduct = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: Types.ObjectId;
  productImages: string[];
  isDeleted: boolean;
};
