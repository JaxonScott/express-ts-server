import  { Router, Request, Response, NextFunction } from "express";
import session from "express-session";
import Product from "../models/Product";

const route = Router();

declare module "express-session" {
  export interface SessionData {
    cart: { items: [{ item: string; quantity: string }] };
  }
}

route.get("/", async (req: Request, res: Response) => {
  const products = await Product.find();
  return res.send(products);
});

route.post("/", async (req: Request, res: Response) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
  });
  await product.save();
  return res.send(product);
});

route.delete("/:id", async (req: Request, res: Response) => {
  try {
    await Product.findByIdAndRemove({ _id: req.params.id });
    return res.send("Product deleted! 🗑");
  } catch (err) {
    res.send("unable to delete product");
  }
});

route.get("/cart", (req: Request, res: Response) => {
  const { cart } = req.session;
  if (!cart) {
    res.send("you have no items in your cart");
  } else {
    res.send(cart);
  }
});

route.post("/cart/item", (req: Request, res: Response) => {
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  if (req.session.cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.sendStatus(201);
});

export default route;
