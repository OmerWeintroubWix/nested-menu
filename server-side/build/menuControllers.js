"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMenus = void 0;
var fs_1 = __importDefault(require("fs"));
var getMenus = function (req, res) {
    try {
        var menusData = fs_1.default.readFileSync('menus.json', 'utf8');
        var menus = JSON.parse(menusData);
        res.json(menus);
    }
    catch (error) {
        res.status(500).json({ error: 'Error reading menus.json' });
    }
};
exports.getMenus = getMenus;
//# sourceMappingURL=menuControllers.js.map