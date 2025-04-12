"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.get("/", function (_, res) {
    res.send("Hello World!");
});
router.post("/", function (_, res) {
    res.send("Hello World!");
});
exports.default = router;
