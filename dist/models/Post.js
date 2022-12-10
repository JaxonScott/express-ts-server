"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
var status;
(function (status) {
    status["start"] = "Started";
    status["progress"] = "In progress";
    status["completed"] = "Completed";
})(status || (status = {}));
const PostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, required: true },
    status: {
        type: String,
        default: status.start,
        enum: Object.values(status),
    },
}, { timestamps: true });
const Post = (0, mongoose_1.model)("Post", PostSchema);
exports.default = Post;
