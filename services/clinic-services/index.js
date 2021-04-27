const db = require('../../dataBase/MySQL').getInit();

module.exports = {
    addClinic: async (clinicObj, transaction) => {
        const Clinic =db.getModel('Clinic');
        return Clinic.create(clinicObj, {transaction})
    },

    getAllClinics: async () => {
        const Clinic =db.getModel('Clinic');
        return Clinic.findAll()
    },

    getOneClinic: async (obj) => {
        const Clinic =db.getModel('Clinic');
        
        return Clinic.findOne({where: obj})
    },

}
