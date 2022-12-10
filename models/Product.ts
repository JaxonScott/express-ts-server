import { Schema, model } from "mongoose";

interface IProduct {
  name: string;
  description: string;
  price: number;
  createdAt: number;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", ProductSchema);
export default Product;
