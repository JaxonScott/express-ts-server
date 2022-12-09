"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const posts_1 = __importDefault(require("./routes/posts"));
require("dotenv/config");
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("This is the main route");
});
app.use(express_1.default.json());
app.use("/api/posts", posts_1.default);
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
