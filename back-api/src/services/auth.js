const jwt = require('jsonwebtoken');
const fs = require('fs')
const jwtSecret = fs.readFileSync('jwtSecret').toString('utf-8');

const bcrypt = require('bcrypt');
const User = require('../entities/user')
const Task = require('../entities/task')



const dureeJwt = (60 * 60)






function createAccount(user) {
    if (user.password) {
        user.password = bcrypt.hashSync(user.password, 10);
    }
    return User.create(user);
}


function logIn(userForm) {
    return new Promise(async (resolve, reject) => {
        User.findOne({
            where: { email: userForm.email },
        }).then((user) => {
            if (!user) {
                return reject('aucun compte/password correspondant')
            }
            let valid = bcrypt.compareSync(userForm.password, user.password)
            if (!valid) {
                return reject('aucun compte/password correspondant')
            }

            let jwtData={
                id: user.get('id'),
                email: user.get('email')
            }

            resolve({jwtToken : createJwt(jwtData)})
        }, err => {
            return reject('aucun compte/password correspondant')
        })

    })

}



function createJwt(jwtDatas) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + dureeJwt,
        data: jwtDatas
    }, jwtSecret)
}







function verifyJwt(token) {
    try {
        var decoded = jwt.verify(token, jwtSecret);
        return decoded
    }
    catch{
        console.log("JWT error")
        return null
    }
}


module.exports = {
    verifyJwt,
    createAccount,
    logIn,
}