const {errorCodes} = require('../constants');
const {clinicServices} = require('../services');
const {transactionInst} = require('../dataBase/MySQL').getInit();

module.exports = {
    addNewClinic: async (req,res) => {
        const transaction = await transactionInst();
        try{
            const {name} = req.body;

            await clinicServices.addClinic({ name }, transaction)
            await transaction.commit();

            res.json('Clinic created')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    updateClinic: async (req,res) => {
        const transaction = await transactionInst();
        try {
            const {boy: {name}, params: {id}} = req;

            await clinicServices(id, {name}, transaction);

            await transaction.commit();

            res.json('Clinic info changed')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    getAllClinics: async (req,res) => {
        try{
            const {} = req.body;

            await clinicServices.getAllClinics()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
