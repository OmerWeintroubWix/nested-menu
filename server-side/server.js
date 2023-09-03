var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
var BASE_URL = '/api/menu/';
app.get(BASE_URL, function (req, res) {
    fs.readFile('menus.json', 'utf8', function (err, data) {
        if (err) {
            res.status(500).json({ error: 'Error reading menus.json' });
        }
        else {
            var json = JSON.parse(data);
            res.json(json);
        }
    });
});
app.post(BASE_URL, function (req, res) {
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
});
var deleteMenu = function (menusArr, menuId) {
    var arrCopy = __spreadArray([], menusArr, true);
    for (var i = 0; i < arrCopy.length; i++) {
        if (arrCopy[i].id == menuId) {
            console.log(arrCopy[i].submenus);
            if (arrCopy[i].submenus.length > 0) {
                for (var j = 0; j < arrCopy[i].submenus.length; j++) {
                    console.log(arrCopy[i].submenus[j]);
                    arrCopy = deleteMenu(arrCopy, arrCopy[i].submenus[j]);
                }
            }
            arrCopy.splice(i, 1);
        }
    }
    return arrCopy;
};
app.delete(BASE_URL + ':menuId', function (req, res) {
    var menuId = req.params.menuId;
    var newMenus = [];
    fs.readFile('menus.json', 'utf8', function (err, data) {
        if (err) {
            res.status(500).json({ error: 'Error reading menus.json' });
        }
        else {
            var menus = JSON.parse(data);
            newMenus = deleteMenu(menus, menuId);
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
});
app.put(BASE_URL + ':menuId', function (req, res) {
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
});
app.listen(8080, function () {
    console.log('Listening on port 8080');
});
