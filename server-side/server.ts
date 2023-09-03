const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// GET endpoint for retrieving menu data
app.get('/api/menu', (req, res) => {
    fs.readFile('menus.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading menus.json' });
        } else {
            const json = JSON.parse(data);
            res.json(json);
        }
    });
});

// POST endpoint for modifying menu data (Example: Append data to menus.json)
app.post('/api/menu', (req, res) => {
    fs.readFile('menus.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading menus.json' });
        } else {
            const menus = JSON.parse(data);

            const newId = Date.now()

            for (let i = 0; i < menus.length; i++) {
                if (menus[i].id === req.json().parentId) {
                    menus[i].submenus.push(newId)
                }
            }

            menus.push({
                id: newId,
                name: req.json().name,
                submenus: [],
            });

            fs.writeFile('menus.json', JSON.stringify(menus), 'utf8', (err) => {
                if (err) {
                    res.status(500).json({ error: 'Error writing menus.json' });
                } else {
                    res.json({ message: 'Menu data updated successfully' });
                }
            });
        }
    });
});

app.listen(8080, () => {
    console.log('Listening on port 8080');
});
