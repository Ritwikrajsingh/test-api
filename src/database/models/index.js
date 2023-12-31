'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../config'))[env];
const db = {};


let sequelize;
// cloud database
let db_uri = process.env.DB_URI

if (db_uri) {
  sequelize = new Sequelize(db_uri)
  console.log("cloud database is running...")
  // local database
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  console.log("local database is running...")
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

/*"db_uri": "postgres://admin:ORcmE4STJ7b1U6p2rKGqxLgUibo987M2@dpg-cicvq2p5rnuhheu09680-a.singapore-postgres.render.com/testdb_67d5?ssl=true"*/