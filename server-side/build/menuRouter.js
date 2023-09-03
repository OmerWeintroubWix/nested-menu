"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRouter = void 0;
var express_1 = __importDefault(require("express"));
var menuControllers_1 = require("./menuControllers");
exports.menuRouter = express_1.default.Router();
var ENDPOINT = '/api/menu';
exports.menuRouter.get(ENDPOINT, menuControllers_1.getMenus);
//# sourceMappingURL=menuRouter.js.map