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
const helpers_1 = require("../utils/helpers");
const User_1 = __importDefault(require("../models/User"));
const route = (0, express_1.Router)();
route.get("/", (req, res) => {
    res.send("This is the auth route 🔐");
});
route.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const userDB = yield User_1.default.findOne({ username });
    if (userDB) {
        res.sendStatus(400);
    }
    else {
        const password = (0, helpers_1.hashPassword)(req.body.password);
        console.log(`Password hash: ${password}`);
        const user = new User_1.default({
            username,
            password,
        });
        yield user.save();
        return res.send(`new user added ${username}`);
    }
}));
route.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //if no username or password passed return 400
    if (!username || !password)
        return res.sendStatus(400);
    //find user by username in db
    const userDB = yield User_1.default.findOne({ username });
    //if no user found with that username return 401
    if (!userDB)
        return res.sendStatus(401);
    //if found compare the raw to hashed password
    const isValid = (0, helpers_1.comparePassword)(password, userDB.password);
    if (isValid) {
        console.log("Authenticated successfully 👍");
        req.session.user = userDB;
        return res.sendStatus(200);
    }
    else {
        console.log("authentication failed 👎");
        return res.sendStatus(401);
    }
}));
exports.default = route;
