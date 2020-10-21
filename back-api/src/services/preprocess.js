const authService= require('./auth')


function checkJwt(req, res, next) {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        console.log('no-user')
        return next()
    }
    let token = req.headers.authorization.replace('Bearer ', '')
    let tokenDecripted = authService.verifyJwt(token)
    if (tokenDecripted && tokenDecripted.data) {
        req.jwt = tokenDecripted.data
    }
    return next()
}


module.exports = {
    checkJwt
}