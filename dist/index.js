"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const db_1 = __importDefault(require("./config/db"));
require("dotenv/config");
require("./strategies/local");
//middleware
const cors_1 = __importDefault(require("cors"));
const authCheck_1 = __importDefault(require("./middleware/authCheck"));
//routes
const posts_1 = __importDefault(require("./routes/posts"));
const products_1 = __importDefault(require("./routes/products"));
const auth_1 = __importDefault(require("./routes/auth"));
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
(0, db_1.default)();
app.get("/", (req, res) => {
    res.send("This is the main route");
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, express_session_1.default)({
    secret: "KASD0KAMSD1MKE2KDASDDWMQN2KLMSAKLD209IMKL",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/api/auth", auth_1.default);
app.use(authCheck_1.default);
app.use("/api/posts", posts_1.default);
app.use("/api/products", products_1.default);
app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});
