const sequelize = require('../orm');
const Sequelize = require('sequelize');
const Task = require('./task');



var User = sequelize.define('user', {
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING,
    adresse: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

User.hasMany(Task);

module.exports = User