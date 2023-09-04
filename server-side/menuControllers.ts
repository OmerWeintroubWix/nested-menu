import * as express from "express";
import * as fs from "fs";
import {Menu} from "./menuTypes";
import {deleteElById} from "./utils";

export const getMenus = (req: express.Request, res: express.Response) => {
    fs.readFile('menus.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({error: 'Error reading menus.json'});
        } else {
            const json = JSON.parse(data);
            res.json(json);
        }
    });
}
export const createMenu = (req: express.Request, res: express.Response) => {
    fs.readFile('menus.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({error: 'Error reading menus.json'});
        } else {
            const menus = JSON.parse(data);

            const newId = Date.now();

            for (let i = 0; i < menus.length; i++) {
                if (menus[i].id == req.body.parentId) {
                    menus[i].submenus.push(newId);
                }
            }

            menus.push({
                id: newId,
                name: req.body.name,
                submenus: [],
            });

            fs.writeFile('menus.json', JSON.stringify(menus), 'utf8', (err) => {
                if (err) {
                    res.status(500).json({error: 'Error writing menus.json'});
                } else {
                    res.json(menus);
                }
            });
        }
    });
}
export const deleteMenu = (req: express.Request, res: express.Response) => {
    const menuId = Number(req.params.menuId);
    let newMenus: Menu[] = []
    fs.readFile('menus.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({error: 'Error reading menus.json'});
        } else {
            const menus = JSON.parse(data);

            newMenus = deleteElById(menus, menuId)

            fs.writeFile('menus.json', JSON.stringify(newMenus), 'utf8', (err) => {
                if (err) {
                    res.status(500).json({error: 'Error writing menus.json'});
                } else {
                    res.json(newMenus);
                }
            });
        }
    });
}
export const renameMenu = (req: express.Request, res: express.Response) => {
    const menuId = req.params.menuId;
    fs.readFile('menus.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({error: 'Error reading menus.json'});
        } else {
            const menus = JSON.parse(data);
            const menusCopy = [...menus]

            for (let i = 0; i < menus.length; i++) {
                if (menus[i].id == menuId) {
                    menusCopy[i].name = req.body.newName
                }
            }

            fs.writeFile('menus.json', JSON.stringify(menusCopy), 'utf8', (err) => {
                if (err) {
                    res.status(500).json({error: 'Error writing menus.json'});
                } else {
                    res.json(menusCopy);
                }
            });
        }
    });
}