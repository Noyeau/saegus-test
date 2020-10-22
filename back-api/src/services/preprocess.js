const authService = require('./auth')
const TaskList = require('../entities/taskList')


function checkJwt(req, res, next) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        console.log('no-user')
        return next()
    }
    let token = req.headers.authorization.replace('Bearer ', '')
    let tokenDecripted = authService.verifyJwt(token)
    if (tokenDecripted && tokenDecripted.data) {
        req.jwt = tokenDecripted.data
        console.log("user", req.jwt)
    }
    return next()
}

async function checkListOfUser(req, res, next) {
    if (!req.jwt || !req.jwt.id) {
        console.log('no-user')
        return res.status(401).send({ msg: "Veuillez vous authentifier" })
    }

    TaskList.findOne({ where: { id: req.params.listId, userId: req.jwt.id } }).then(list=>{
        if(list){
            next()
            return
        }
        res.status(401).send({ msg: "Liste introuvable" })
    }, err=>{
            res.status(401).send({ msg: "Liste introuvable" })
    })
    

}

module.exports = {
    checkJwt,
    checkListOfUser
}