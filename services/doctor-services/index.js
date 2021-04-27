const db = require('../../dataBase/MySQL').getInit();

module.exports = {
    addDoctor: async (doctorObj, transaction) => {
        const Doctor =db.getModel('Doctor');
        return Doctor.create(doctorObj, {transaction})
    },

    getDoctors: async () => {
        const Doctor =db.getModel('Doctor');
        return Doctor.findAll()
    },

    getOneDoctor: async (doctorObj) => {
        const Doctor =db.getModel('Doctor');

        return Doctor.findOne({where: doctorObj})
    },

}
