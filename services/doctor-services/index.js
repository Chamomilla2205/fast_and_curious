const db = require('../../dataBase/MySQL').getInit();

module.exports = {
    addDoctor: async (doctorObj, transaction) => {
        const Doctor = db.getModel('Doctor');

        return Doctor.create(doctorObj, {transaction});
    },

    updateDoctor: async (id,doctorObj, transaction) => {
        const Doctor = db.getModel('Doctor');

        return Doctor.update(doctorObj, {where: {id}} ,{transaction})
    },

    addSpecialityToDoc: async (specialityObj, transaction) => {
        const Doctors_services = db.getModel('Doctors_services');

        return Doctors_services.create(specialityObj,{transaction});
    },

    getDoctors: async (doctorObj) => {
        const Doctor =db.getModel('Doctor');

        return Doctor.findAll({where: doctorObj});
    },

    getOneDoctor: async (doctorObj) => {
        const Doctor =db.getModel('Doctor');

        return Doctor.findOne({where: doctorObj});
    },

    getDoctorsClinic: async (id) => {
        const Doctors_in_clinic = db.getModel('Doctors_in_clinic');

        return Doctors_in_clinic.findAll({where: id});
    }
}
