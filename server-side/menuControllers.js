"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renameMenu = exports.deleteMenu = exports.createMenu = exports.getMenus = void 0;
var fs = require("fs");
var utils_1 = require("./utils");
var getMenus = function (req, res) {
    fs.readFile('menus.json', 'utf8', function (err, data) {
        if (err) {
            res.status(500).json({ error: 'Error reading menus.json' });
        }
        else {
            var json = JSON.parse(data);
            res.json(json);
        }
    });
};
exports.getMenus = getMenus;
var createMenu = function (req, res) {
    fs.readFile('menus.json', 'utf8', function (err, data) {
        if (err) {
            res.status(500).json({ error: 'Error reading menus.json' });
        }
        else {
            var menus_1 = JSON.parse(data);
            var newId = Date.now();
            for (var i = 0; i < menus_1.length; i++) {
                if (menus_1[i].id == req.body.parentId) {
                    menus_1[i].submenus.push(newId);
                }
            }
            menus_1.push({
                id: newId,
                name: req.body.name,
                submenus: [],
            });
            fs.writeFile('menus.json', JSON.stringify(menus_1), 'utf8', function (err) {
                if (err) {
                    res.status(500).json({ error: 'Error writing menus.json' });
                }
                else {
                    res.json(menus_1);
                }
            });
        }
    });
};
exports.createMenu = createMenu;
var deleteMenu = function (req, res) {
    var menuId = Number(req.params.menuId);
    var newMenus = [];
    fs.readFile('menus.json', 'utf8', function (err, data) {
        if (err) {
            res.status(500).json({ error: 'Error reading menus.json' });
        }
        else {
            var menus = JSON.parse(data);
            newMenus = (0, utils_1.deleteElById)(menus, menuId);
            fs.writeFile('menus.json', JSON.stringify(newMenus), 'utf8', function (err) {
                if (err) {
                    res.status(500).json({ error: 'Error writing menus.json' });
                }
                else {
                    res.json(newMenus);
                }
            });
        }
    });
};
exports.deleteMenu = deleteMenu;
var renameMenu = function (req, res) {
    var menuId = req.params.menuId;
    fs.readFile('menus.json', 'utf8', function (err, data) {
        if (err) {
            res.status(500).json({ error: 'Error reading menus.json' });
        }
        else {
            var menus = JSON.parse(data);
            var menusCopy_1 = __spreadArray([], menus, true);
            for (var i = 0; i < menus.length; i++) {
                if (menus[i].id == menuId) {
                    menusCopy_1[i].name = req.body.newName;
                }
            }
            fs.writeFile('menus.json', JSON.stringify(menusCopy_1), 'utf8', function (err) {
                if (err) {
                    res.status(500).json({ error: 'Error writing menus.json' });
                }
                else {
                    res.json(menusCopy_1);
                }
            });
        }
    });
};
exports.renameMenu = renameMenu;
