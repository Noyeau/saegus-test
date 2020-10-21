const router = require("express").Router();
const userService = require("../services/user");

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Retourne les infos de l'user connecté
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
    let user = await userService.getById(req.jwt.id)
    if (user) {
        res.status(200).send(user)
        return
    }

    res.status(400).send({ msg: "error", err })
})


module.exports = router;