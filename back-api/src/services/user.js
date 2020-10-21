const User = require('../entities/user')

async function  getById(id) {
    return await User.findOne({
        where: { id: id },
        attributes: { exclude: ['password'] },
    })
}

async function getAll() {
    return await User.findAll({ attributes: { exclude: ['password'] } })
}

async function createUser(user) {
    return await User.create(user);
}


async function setUser(user){

}

module.exports = {
    getById,
    getAll,
    createUser,
}