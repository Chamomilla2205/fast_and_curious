const {errorCodes} = require('../constants');
const {clinicServices, doctorServices, specialityServices} = require('../services');
const {transactionInst} = require('../dataBase/MySQL').getInit();

module.exports = {
    addNewSpeciality: async (req,res) => {
        const transaction = await transactionInst();
        try{
            const {speciality} = req.body;
            await specialityServices.addSpeciality({ speciality }, transaction)
            await transaction.commit();

            res.json('Speciality created')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },
    getAllSpecialities: async (req,res) => {
        try{
            console.log('START')
            const services = await specialityServices.getSpecialities();
            console.log(services)
            res.json(services)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
