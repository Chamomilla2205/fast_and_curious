const db = require('../../dataBase/MySQL').getInit();

module.exports = {
    newToken: async (tokens, admin_id) => {
        const O_Auth = db.getModel('O_Auth');
        console.log(tokens)
        console.log(admin_id)
        console.log({...tokens, admin_id})
        return O_Auth.create({...tokens, admin_id})
    },

    checkToken: async (token) => {
        const O_Auth = db.getModel('O_Auth');

        return O_Auth.findOne({where: token})
    }
}
