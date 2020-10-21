

const app = require('express')();
const http = require('http').createServer(app);


const cors = require('cors');
const path = require('path');
const corsOptions = require('./cors-config').corsOptions;
const bodyParser = require('body-parser');
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swagger/swagger.js')(path.dirname(require.main.filename))
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpecs = swaggerJsdoc(swaggerOptions);



const sequelize =  require('./orm')




//Initialisation de la BDD
sequelize.authenticate().then(() => {
  console.log('Connection established successfully.');
  let task = require('./entities/task')
  let user = require('./entities/user')

  task.sync({force: true}).then(function () {
    console.log("Task Sync BDD")
   });
  user.sync({force: true}).then(function () {
    console.log("User Sync BDD")
   });
})



app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpecs)
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(cors(corsOptions))
app.use(bodyParser())
app.use(routes)





http.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})