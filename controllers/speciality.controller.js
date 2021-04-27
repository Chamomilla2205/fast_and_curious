const {errorCodes} = require('../constants');
const {clinicServices, doctorServices, specialityServices} = require('../services');
const {transactionInst} = require('../dataBase/MySQL').getInit();

module.exports = {
    addNewSpeciality: async (req,res) => {
        const transaction = await transactionInst();
        try{
            const {name} = req.body;

            await specialityServices.addSpeciality({ name }, transaction)
            await transaction.commit();

            res.json('Speciality created')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },
    getAllSpecialities: async (req,res) => {
        try{
            const {} = req.body;

            await specialityServices.getSpecialities()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },
    getSingleSpecialities: async (req,res) => {
        try{
            const {id} = req.params;

            await specialityServices.getOneSpeciality({id})
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
