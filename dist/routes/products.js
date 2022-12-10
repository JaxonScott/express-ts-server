"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_1 = __importDefault(require("../models/Product"));
const route = (0, express_1.Router)();
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find();
    return res.send(products);
}));
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new Product_1.default({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    });
    yield product.save();
    return res.send(product);
}));
route.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.findByIdAndRemove({ _id: req.params.id });
        return res.send("Product deleted! 🗑");
    }
    catch (err) {
        res.send("unable to delete product");
    }
}));
route.get("/cart", (req, res) => {
    const { cart } = req.session;
    if (!cart) {
        res.send("you have no items in your cart");
    }
    else {
        res.send(cart);
    }
});
route.post("/cart/item", (req, res) => {
    const { item, quantity } = req.body;
    const cartItem = { item, quantity };
    if (req.session.cart) {
        req.session.cart.items.push(cartItem);
    }
    else {
        req.session.cart = {
            items: [cartItem],
        };
    }
    res.sendStatus(201);
});
exports.default = route;
