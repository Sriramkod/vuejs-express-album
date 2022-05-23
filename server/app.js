console.log("app.js - start");

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./src/models')
const config = require('./src/config/config')
const app = express();
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


require('./src/routes')(app)

sequelize.sync()
.then(() => {

    app.listen(config.port)
    console.log(`server started, ${config.port}`);
})
.catch(() => {})

console.log("ok");