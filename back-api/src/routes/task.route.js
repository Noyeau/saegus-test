const router = require("express").Router({ mergeParams: true });

const Task = require('../entities/task')

/**
 * @swagger
 * /lists/{listId}/tasks:
 *   get:
 *     tags:
 *       - Task
 *     description: retourne toutes les tache de la liste
 *     parameters:
 *       - in: path
 *         name: listId
 *       - in: path
 *         name: id
 *     security:
 *       - JWT: []
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
 /**
 * @swagger
 * /lists/{listId}/tasks/{id}:
 *   get:
 *     tags:
 *       - Task
 *     description: Récupération d'un tache
 *     parameters:
 *       - in: path
 *         name: listId
 *       - in: path
 *         name: id
 *     security:
 *       - JWT: []
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
 /**
 * @swagger
 * /lists/{listId}/tasks:
 *   post:
 *     tags:
 *       - Task
 *     description: Création d'une Tache
 *     parameters:
 *       - in: path
 *         name: listId
 *       - in: body
 *         name: task
 *         description: tache a créer
 *     security:
 *       - JWT: []
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
 /**
 * @swagger
 * /lists/{listId}/tasks/{id}:
 *   post:
 *     tags:
 *       - Task
 *     description: mise à jour d'une tache existante
 *     parameters:
 *       - in: path
 *         name: listId
 *       - in: path
 *         name: id
 *       - in: body
 *         name: task
 *         description: tache a modifier
 *     security:
 *       - JWT: []
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
/**
 * @swagger
 * /lists/{listId}/tasks/{id}:
 *   delete:
 *     tags:
 *       - Task
 *     description: suppression d'une tache
 *     parameters:
 *       - in: path
 *         name: listId
 *       - in: path
 *         name: id
 *     security:
 *       - JWT: []
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
router.delete('/:id', async (req, res) => {
    if (!req.jwt) {
        res.status(401).send({ msg: "Merci de vous authentifier" })
        return
    }

    if (isNaN(req.params.id)) {
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