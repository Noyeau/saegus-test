const Sequelize = require('sequelize');
const sequelize = new Sequelize('saegus', 'root', "", {
    host: 'localhost',
    dialect: 'mysql'
});

function init() {
    //Initialisation de la BDD
    return new Promise((resolve, reject) => {
        sequelize.authenticate().then(() => {
            console.log('Connection established successfully.');

            let User = require('./entities/user')
            let TaskList = require('./entities/taskList')
            let Task = require('./entities/task')

            User.hasMany(TaskList, { as: "taskLists" });
            TaskList.hasMany(Task, { as: "task" });


            resolve(true)

            User.sync().then(function () {
                console.log("User Sync BDD")
            });

            Task.sync().then(function () {
                console.log("Task Sync BDD")
            });

            TaskList.sync().then(function () {
                console.log("TaskList Sync BDD")
            });
        }, err=>{
            reject(err)
        })
    })

}
module.exports = {
    init,
    sequelize
}