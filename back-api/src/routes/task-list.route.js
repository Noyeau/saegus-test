const router = require("express").Router();
const userService = require("../services/user");

const TaskList = require('../entities/taskList')

const Task = require('../entities/task')

/**
 * @swagger
 * /lists:
 *   get:
 *     tags:
 *       - List
 *     description: retourne toutes les listes de l'user
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
    if(!req.jwt){
        res.status(401).send({ msg: "Merci de vous authentifier"})
        return 
    }
    let tasklList = await TaskList.findAll({where:{userId:req.jwt.id}})
  
    res.status(200).send(tasklList)
})


//New List
/**
 * @swagger
 * /lists:
 *   post:
 *     tags:
 *       - List
 *     description: ajouter une liste
 *     parameters:
 *       - in: body
 *         name: taskList
 *         description: liste
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
    if(!req.jwt){
        res.status(401).send({ msg: "Merci de vous authentifier"})
        return 
    }

    if(!req.body || !req.body.title){
        res.status(404).send({ msg: "Donnée manquantes"})
        return 
    }

    let list = {...req.body, userId: req.jwt.id}
    let tasklList = await TaskList.create(list)
  
    res.status(200).send(tasklList)
})


//get One List
/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     tags:
 *       - List
 *     description: retourne une liste
 *     parameters:
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
      if(!req.jwt){
          res.status(401).send({ msg: "Merci de vous authentifier"})
          return 
      }
  
      if(isNaN(req.params.id)){
          res.status(404).send({ msg: "Donnée manquantes"})
          return 
      }
  
      let list = await TaskList.findOne({where:{id:req.params.id, userId:req.jwt.id}})
      if(list){
          res.status(200).send(list)
          return
      }
      res.status(403).send({ msg: "Liste non trouvé"})
  })


//Update List
/**
 * @swagger
 * /lists/{id}:
 *   post:
 *     tags:
 *       - List
 *     description: modification d'une liste
 *     parameters:
 *       - in: path
 *         name: id
 *       - in: body
 *         name: taskList
 *         description: liste a modifier
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
    if(!req.jwt){
        res.status(401).send({ msg: "Merci de vous authentifier"})
        return 
    }

    if(isNaN(req.params.id) || !req.body || !req.body.title){
        res.status(404).send({ msg: "Donnée manquantes"})
        return 
    }

    let list = await TaskList.findOne({where:{id:req.params.id, userId:req.jwt.id}})
    if(list){
        Object.assign(list, req.body)
        let tmp = await list.save()
        res.status(200).send(tmp)
        return
    }
    res.status(403).send({ msg: "Liste non trouvé"})
})


//Delete List
/**
 * @swagger
 * /lists/{id}:
 *   delete:
 *     tags:
 *       - List
 *     description: suppression d'une liste
 *     parameters:
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
    if(!req.jwt){
        res.status(401).send({ msg: "Merci de vous authentifier"})
        return 
    }

    if(isNaN(req.params.id)){
        res.status(404).send({ msg: "Donnée manquantes"})
        return 
    }

    let list = await TaskList.findOne({where:{id:req.params.id, userId:req.jwt.id}})
    if(list){
        let tmp = await list.destroy()
        if(tmp){
            res.status(200).send({msg:"Element supprimé"})
            return
        }
        res.status(404).send({msg:"Error suppression"})
        return
       
    }
    res.status(403).send({ msg: "Liste non trouvé"})
})




module.exports = router;