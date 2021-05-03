const db = require('../../dataBase/MySQL').getInit();

module.exports = {
    addSpeciality: async (serviceObj, transaction) => {
        const Services = db.getModel('Services');

        return Services.create(serviceObj, {transaction})
    },

    getSpecialities: async (objId) => {
        const Services = db.getModel('Services');
        return Services.findAll({where: objId})
    },

    getOneSpeciality: async (serviceObj) => {
        const Services = db.getModel('Services');

        const {dataValues} = await Services.findOne({where: serviceObj});
        return dataValues;
    },

    getDoctorsSpecialities: async (id) => {
        const Doctors_services = db.getModel('Doctors_services');

        return Doctors_services.findAll({where: id});
    },
    getDoctorsSpeciality: async (id) => {
        const Doctors_services = db.getModel('Doctors_services');

        return Doctors_services.findOne({where: id});
    }
}
