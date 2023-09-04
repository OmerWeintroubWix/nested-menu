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
exports.deleteElById = void 0;
var deleteElById = function (menusArr, menuId) {
    var arrCopy = __spreadArray([], menusArr, true);
    for (var i = 0; i < arrCopy.length; i++) {
        if (arrCopy[i].submenus.includes(menuId)) {
            arrCopy[i].submenus = arrCopy[i].submenus.filter(function (item) { return item != menuId; });
        }
        if (arrCopy[i].id == menuId) {
            if (arrCopy[i].submenus.length > 0) {
                for (var j = 0; j < arrCopy[i].submenus.length; j++) {
                    arrCopy = (0, exports.deleteElById)(arrCopy, arrCopy[i].submenus[j]);
                }
            }
            arrCopy.splice(i, 1);
        }
    }
    return arrCopy;
};
exports.deleteElById = deleteElById;
