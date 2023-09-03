const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

type Menu = {
    id: number | string,
    name: string,
    submenus: number[],
}
type Id = number | string

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

const BASE_URL = "/api/menu/";
app.get(BASE_URL, (req, res) => {
    fs.readFile('menus.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({error: 'Error reading menus.json'});
        } else {
            const json = JSON.parse(data);
            res.json(json);
        }
    });
});
app.post(BASE_URL, (req, res) => {
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
  });
});

const deleteMenu = (menusArr: Menu[], menuId: Id) => {
    let arrCopy = [...menusArr]
    for (let i = 0; i < arrCopy.length; i++) {
        if (arrCopy[i].id == menuId) {
            console.log(arrCopy[i].submenus)
            if (arrCopy[i].submenus.length > 0) {
                for (let j = 0; j < arrCopy[i].submenus.length; j++) {
                    console.log(arrCopy[i].submenus[j])
                    arrCopy = deleteMenu(arrCopy, arrCopy[i].submenus[j])
                }
            }
            arrCopy.splice(i, 1)
        }
      }
      arrCopy.splice(i, 1);
    }
    return arrCopy
}

app.delete(BASE_URL + ':menuId', (req, res) => {
    const menuId = req.params.menuId;
    let newMenus: Menu[] = []
    fs.readFile('menus.json', 'utf8', (err, data) => {
        if (err) {
           res.status(500).json({error: 'Error reading menus.json'});
        } else {
            const menus = JSON.parse(data);

            newMenus = deleteMenu(menus, menuId)

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
  });
});

app.put(BASE_URL + ':menuId', (req, res) => {
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
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
