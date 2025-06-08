'use strict';
const { readdirSync } = require('fs');
const { basename: _basename, join } = require('path');
const { env: _env } = require('process');
const config = require('../config/config.js');
const Sequelize = require('sequelize');

const basename = _basename(__filename);
const env = _env.NODE_ENV || 'development';
const db = {};

const dbConfig = config[env];

let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(_env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
    }
  );
}

const DataTypes = Sequelize.DataTypes;

// reads automatically ./models/ to import all the models and add them to "db"
for (const file of readdirSync(__dirname)) {
  if (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file !== 'task_tags.js'
  ) {
    const modelModule = require(join(__dirname, file));
    const model = modelModule(sequelize, DataTypes);
    db[model.name] = model;
  }
}

// include the associations
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
