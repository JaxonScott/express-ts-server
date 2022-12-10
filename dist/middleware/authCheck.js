"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = (0, express_1.Router)();
route.use((req, res, next) => {
    if (req.session.user)
        next();
    else {
        res.sendStatus(401);
    }
});
exports.default = route;
