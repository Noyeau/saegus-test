const Sequelize = require('sequelize');
const sequelize = require('../orm').sequelize;
const TaskList = require('./taskList');



var Task = sequelize.define('task', {
    shortDescription: Sequelize.STRING,
    longDescription: Sequelize.STRING,
    echeanceDate: Sequelize.DATE,
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

// Task.belongsTo(TaskList, {
//     foreignKey: "taskListId",
//     as: "taskList"
// });


module.exports = Task