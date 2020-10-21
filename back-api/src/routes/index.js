
const router = require("express").Router();
const users = require("./users.route");
const taskList = require("./task-list.route");
const task = require("./task.route");


const auth = require("./auth.route");



router.get('/', (req, res) =>{
    res.end("Hello World!")
})

router.use('/users', users)
router.use('/auth', auth)
router.use('/lists', taskList)
router.use('/lists/:listId/tasks', task)





module.exports = router;