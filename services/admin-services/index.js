const {errorCodes} = require('../../constants');
const db = require('../../dataBase/MySQL').getInit();

module.exports = {
    getOneAdmin: async (obj) => {
        const Admin = db.getModel('Admin');

        const {dataValues} = await Admin.findOne({where: obj});

        return dataValues;
    },
    changePassword: async (id, obj, transaction) => {
        const Admin = db.getModel('Admin');

        return Admin.update(obj, {where: obj, transaction})
    }
}
