
const router = require("express").Router();
const users = require("./users.route");
const taskList = require("./task-list.route");
const task = require("./task.route");
const checkListOfUser = require("../services/preprocess").checkListOfUser;



const auth = require("./auth.route");



router.get('/', (req, res) =>{
    res.end("Hello World!")
})

router.use('/users', users)
router.use('/auth', auth)
router.use('/lists', taskList)
router.use('/lists/:listId/tasks', checkListOfUser, task)





module.exports = router;