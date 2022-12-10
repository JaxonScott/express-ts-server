"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
route.get("/", (req, res) => {
    res.send("This is the auth route 🔐");
});
route.post("/login", (req, res) => {
    const { username, password } = req.body;
    //check if username & password was passed
    if (username && password) {
        //check if the user already has a logged in session
        if (req.session.user) {
            res.send(req.session.user);
            //if not create a session
        }
        else {
            req.session.user = {
                username,
            };
            res.send(req.session);
        }
    }
    else {
        res.sendStatus(400);
    }
});
exports.default = route;
