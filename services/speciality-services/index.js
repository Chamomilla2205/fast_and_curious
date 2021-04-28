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
        console.log('________________')
        console.log(serviceObj)
        console.log('_______________-')
        return Services.findOne({where: serviceObj});
    },

    getDoctorsClinic: async (doctor_id) => {
        const Doctors_services = db.getModel('Doctors_services');

        return Doctors_services.findAll({where: doctor_id});
    }
}
