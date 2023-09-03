const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.get('/api/menu', (req, res) => {
    const data = fs.readFileSync('menus.json')
    res.send(data)
})
app.listen(8080, () => {
    console.log('Listening on port 8080')
})