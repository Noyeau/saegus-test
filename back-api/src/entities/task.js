const sequelize = require('../orm');
const Sequelize = require('sequelize');


var Task = sequelize.define('task', {
    shortDescription: Sequelize.STRING,
    longDescription: Sequelize.STRING,
    echeanceDate: Sequelize.DATE
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});




module.exports = Task