const db = require('../../dataBase/MySQL').getInit();

module.exports = {
    addSpeciality: async (serviceObj, transaction) => {
        const Services =db.getModel('Services');
        return Services.create(serviceObj, {transaction})
    },

    updateSpeciality: async (id,specialityObj, transaction) => {
        const Services =db.getModel('Services');
        return Services.create(specialityObj, {where: {id}} ,{transaction})
    },

    getSpecialities: async () => {
        const Services = db.getModel('Services');
        return Services.findAll()
    },

    getOneSpeciality: async (serviceObj) => {
        const Services =db.getModel('Services');

        return Services.findOne({where: serviceObj})
    },

}
