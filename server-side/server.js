"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var menuRouter_1 = require("./menuRouter");
// @ts-ignore
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// @ts-ignore
app.use(cors());
app.use(menuRouter_1.default);
app.listen(8080, function () {
    console.log("Listening on port 8080");
});
