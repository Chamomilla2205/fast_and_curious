const db = require('../../dataBase/MySQL').getInit();

module.exports = {
    addClinic: async (clinicObj, transaction) => {
        const Clinic = db.getModel('Clinic');
        return Clinic.create(clinicObj, {transaction});
    },

    updateClinic: async (id,clinicObj, transaction) => {
        const Clinic =db.getModel('Clinic');
        return Clinic.update(clinicObj, {where: {id}} ,{transaction});
    },

    addDoctorForClinic: async (doctorObj, transaction) => {
        const Doctors_in_clinic = db.getModel('Doctors_in_clinic');

        return Doctors_in_clinic.create(doctorObj, {transaction});
    },

    getAllClinics: async (clinicObj) => {
        const Clinic =db.getModel('Clinic');

        return Clinic.findAll({where: clinicObj});
    },

    getOneClinic: async (clinicObj) => {
        const Clinic =db.getModel('Clinic');

        const { dataValues } = await Clinic.findOne({where: clinicObj});
        return dataValues;
    }

}
