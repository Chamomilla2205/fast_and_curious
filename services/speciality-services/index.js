const db = require('../../dataBase/MySQL').getInit();

module.exports = {
    addSpeciality: async (doctorObj, transaction) => {
        const Services =db.getModel('Services');
        return Services.create(doctorObj, {transaction})
    },

    getSpecialities: async () => {
        const Services =db.getModel('Services');
        return Services.findAll()
    }
}
