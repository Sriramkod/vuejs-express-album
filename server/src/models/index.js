const fs = require('fs')
const path = require('path')

const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)
fs
    .readdirSync(__dirname)
    .filter((file) =>
        file  !== 'index.js'
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        //const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    })

db.sequelize = sequelize
db.Sequelize = Sequelize
db.albums = require("./album.model.js")(sequelize, Sequelize);
db.songs = require("./song.model.js")(sequelize, Sequelize);
module.exports = db