const router = require("express").Router();
const userService = require("../services/user");

const TaskList = require('../entities/taskList')

/**
 * @swagger
 * /lists:
 *   get:
 *     tags:
 *       - lists
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
    if(!req.jwt){
        res.status(401).send({ msg: "Merci de vous authentifier"})
        return 
    }
    console.log(req.jwt)
    let tasklList = await TaskList.findAll({where:{userId:req.jwt.id}})
  
    res.status(200).send(tasklList)
})


//New List
router.post('/', async (req, res) => {
    if(!req.jwt){
        res.status(401).send({ msg: "Merci de vous authentifier"})
        return 
    }

    if(!req.body || !req.body.title){
        res.status(404).send({ msg: "Donnée manquantes"})
        return 
    }

    console.log(req.param)
    let list = {...req.body, userId: req.jwt.id}
    let tasklList = await TaskList.create(list)
  
    res.status(200).send(tasklList)
})





//Update List
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
router.delete('/:id', async (req, res) => {
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
        let tmp = await list.destroy()
        if(tmp){
            res.status(200).send(tmp)
            return
        }
        res.status(404).send({msg:"Error suppression"})
        return
       
    }
    res.status(403).send({ msg: "Liste non trouvé"})
})

module.exports = router;