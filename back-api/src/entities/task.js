const Sequelize = require('sequelize');
const sequelize = require('../orm').sequelize;
const TaskList = require('./taskList');



var Task = sequelize.define('task', {
    shortDescription: { type: Sequelize.STRING, allowNull: false},
    longDescription: Sequelize.STRING,
    echeanceDate: { type: Sequelize.DATE, allowNull: false},
    finish: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});

// Task.belongsTo(TaskList, {
//     foreignKey: "taskListId",
//     as: "taskList"
// });


module.exports = Task