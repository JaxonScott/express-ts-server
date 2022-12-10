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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const User_1 = __importDefault(require("../models/User"));
const helpers_1 = require("../utils/helpers");
passport_1.default.serializeUser((user, done) => {
    console.log("Serializing user...");
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Deserializing user...");
    console.log(id);
    try {
        const user = yield User_1.default.findById(id);
        if (!user)
            throw new Error("user not found");
        console.log(user);
        done(null, user);
    }
    catch (err) {
        console.log(err);
        done(err, null);
    }
}));
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "username",
}, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //if user dosent pass email or password throw new error
        if (!username || !password) {
            throw new Error("missing credentials🔐");
        }
        //check db to see if theres a user with a matching username
        const userDB = yield User_1.default.findOne({ username });
        //if not throw error
        if (!userDB) {
            throw new Error("User not found 🚫");
        }
        //if there is compare the raw password to the users hashed password in the db
        const isValid = (0, helpers_1.comparePassword)(password, userDB.password);
        if (isValid) {
            console.log("Authenticated successfully 👍");
            done(null, userDB);
        }
        else {
            console.log("authentication failed 👎");
            done(null, null);
        }
    }
    catch (err) {
        console.log(err);
        done(err, null);
    }
})));
