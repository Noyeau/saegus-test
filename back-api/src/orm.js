const Sequelize = require('sequelize');


const environment = require('./environment')




const sequelize = new Sequelize(
    environment.database.database,
    environment.database.user,
    environment.database.password,
    {
        host: environment.database.host,
        dialect: environment.database.dialect
    }
);

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
            Task.belongsTo(TaskList)
            TaskList.belongsTo(User)


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
        }, err => {
            reject(err)
        })
    })

}
module.exports = {
    init,
    sequelize
}