const {errorCodes} = require('../constants');
const {clinicServices, doctorServices, specialityServices} = require('../services');
const {transactionInst} = require('../dataBase/MySQL').getInit();

module.exports = {
    addNewDoctor: async (req,res) => {
        const transaction = await transactionInst();
        try{
            const {name} = req.body;

            await doctorServices.addDoctor({ name }, transaction)
            await transaction.commit();

            res.json('Doctor created')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    updateDoctor: async (req,res) => {
        const transaction = await transactionInst();
        try {
            const {boy: {name}, params: {id}} = req;

            await doctorServices.updateDoctor(id, {name}, transaction);

            await transaction.commit();

            res.json('Doctor info changed')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    getAllDoctors: async (req,res) => {
        try{
            const {} = req.body;

            await doctorServices.getDoctors()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    getSingleDoctor: async (req,res) => {
        try {
            const {id} = req.params;

            await doctorServices.getOneDoctor({id})
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
