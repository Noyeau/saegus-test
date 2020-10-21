const Sequelize = require('sequelize');
const sequelize = require('../orm').sequelize;
const TaskList = require('./taskList');



var User = sequelize.define('user', {
    nom: Sequelize.STRING,
    prenom: Sequelize.STRING,
    adresse: Sequelize.STRING,
    email: {type: Sequelize.STRING, unique: true, allowNull: false},
    password: Sequelize.STRING,
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});



module.exports = User