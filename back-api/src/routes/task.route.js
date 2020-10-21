const router = require("express").Router({ mergeParams: true });

const Task = require('../entities/task')

/**
 * @swagger
 * /lists/:listId/tasks:
 *   get:
 *     tags:
 *       - Task
 *     description: retourne toutes les listes de l'user
 *     security:
 *       - jwt:[]
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *        description: 'user'
 *      400:
 *        description: 'missing argument'
 *      403:
 *        description: 'no-user'
 *      500:
 *        description: 'error server'
 *
 */
router.get('/', async (req, res) => {
    if (!req.jwt) {
        res.status(401).send({ msg: "Merci de vous authentifier" })
        return
    }


    let task = await Task.findAll({ where: { taskListId: req.params.listId } })
    if (task) {
        res.status(200).send(task)
        return
    }
    res.status(403).send({ msg: "Tache non trouvé" })
})


//get One Task
router.get('/:id', async (req, res) => {
    if (!req.jwt) {
        res.status(401).send({ msg: "Merci de vous authentifier" })
        return
    }

    if (isNaN(req.params.id)) {
        res.status(404).send({ msg: "Donnée manquantes" })
        return
    }

    let task = await Task.findOne({ where: { id: req.params.id, taskListId: req.params.listId } })
    if (task) {
        res.status(200).send(task)
        return
    }
    res.status(403).send({ msg: "Tache non trouvé" })
})


//New Task
router.post('/', async (req, res) => {
    if (!req.jwt) {
        res.status(401).send({ msg: "Merci de vous authentifier" })
        return
    }

    if (!req.body || !req.body.shortDescription || !req.body.echeanceDate) {
        res.status(404).send({ msg: "Donnée manquantes" })
        return
    }

    let task = { ...req.body, taskListId: +req.params.listId }
     Task.create(task).then((newTask)=>{
        res.status(200).send(newTask)
    },err=>{
        res.status(404).send(err)
    })
    
})





//Update Task
router.post('/:id', async (req, res) => {
    if (!req.jwt) {
        res.status(401).send({ msg: "Merci de vous authentifier" })
        return
    }

    if (isNaN(req.params.id)) {
        res.status(404).send({ msg: "Donnée manquantes" })
        return
    }

    let task = await Task.findOne({ where: { id: req.params.id, taskListId: req.params.listId } })
    if (task) {
        Object.assign(task, req.body)
        let tmp = await task.save()
        res.status(200).send(tmp)
        return
    }
    res.status(403).send({ msg: "Tache non trouvé" })
})


//Delete Task
router.delete('/:id', async (req, res) => {
    if (!req.jwt) {
        res.status(401).send({ msg: "Merci de vous authentifier" })
        return
    }

    if (isNaN(req.params.id) || !req.body || !req.body.title) {
        res.status(404).send({ msg: "Donnée manquantes" })
        return
    }

    let list = await Task.findOne({ where: { id: req.params.id, taskListId: req.params.listId } })
    if (list) {
        let tmp = await list.destroy()
        if (tmp) {
            res.status(200).send({msg:"Element supprimé"})
            return
        }
        res.status(404).send({ msg: "Error suppression" })
        return

    }
    res.status(403).send({ msg: "Tache non trouvé" })
})

module.exports = router;