const router = require("express").Router();
const userService = require("../services/user");
const authService = require("../services/auth");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Connection
 *     parameters:
 *       - in: body
 *         name: logInInfos
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
router.post('/login', async (req, res) => {
    let user = req.body
    if (!user || !user.password || !user.email) {
        res.status(400).send({ msg: 'données manquantes' })
    }


    authService.logIn(req.body).then(user => {

        res.status(200).send(user)
    }, err => {
        res.status(400).send({ msg: 'Error', err })
    })
})


/**
 * @swagger
 * /auth/signin:
 *   post:
 *     tags:
 *       - Auth
 *     description: Création d'un nouvel utilisateur
 *     parameters:
 *       - in: body
 *         name: userInfos
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
router.post('/signin', async (req, res) => {
    let userTmp = req.body
    if (!userTmp) {
        res.status(400).send({ msg: 'données manquantes' })
    }
    authService.createAccount(req.body).then(user => {
        res.status(200).send(user)
    }, err => {
        res.status(400).send({ msg: 'Error', err })
    })
})

module.exports = router;