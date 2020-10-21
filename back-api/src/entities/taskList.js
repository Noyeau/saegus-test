const Sequelize = require('sequelize');
const sequelize = require('../orm').sequelize;
const Task = require('./task');
const User = require('./user');



var TaskList = sequelize.define('task-list', {
    title: Sequelize.STRING,
    description: Sequelize.STRING
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

// TaskList.belongsTo(User, {
//     foreignKey: "id",
//     as: "user"
// });



module.exports = TaskList