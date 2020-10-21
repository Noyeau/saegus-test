var Sequelize = require('sequelize');
var sequelize = new Sequelize('saegus', 'root', "", {
    host: 'localhost',
    dialect: 'mysql'
  });


module.exports=sequelize