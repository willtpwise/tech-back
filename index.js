const bodyParser = require('body-parser')
const port = process.env.PORT || 3000
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

const routes = require('./api/routes/index.js')
routes(app)

app.listen(port)

console.log('Listening on: ' + port)
