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
const Post_1 = __importDefault(require("../models/Post"));
const route = (0, express_1.Router)();
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield Post_1.default.find();
    return res.send(posts);
}));
route.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.findById({ _id: req.params.id });
        return res.send(post);
    }
    catch (err) {
        res.send("Unable to find post with this id");
    }
}));
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = new Post_1.default({
        title: req.body.title,
        body: req.body.body,
        author: req.body.author,
        status: req.body.status,
    });
    yield post.save();
    return res.send(post);
}));
route.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield Post_1.default.findById({ _id: req.params.id });
    if (!post) {
        res.send("Unable to find post with this id");
    }
    else {
        yield Post_1.default.findByIdAndDelete({ _id: req.params.id });
        res.send("Post deleted! 🗑");
    }
}));
route.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatePost = yield Post_1.default.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                title: req.body.title,
                body: req.body.body,
                author: req.body.author,
                status: req.body.status,
            },
        }, { new: true });
        res.send(updatePost);
    }
    catch (err) {
        res.send("unable to update post");
    }
}));
const postRoute = route;
exports.default = postRoute;
