const {errorCodes} = require('../constants')
const {clinicServices} = require('../services')

module.exports = {
    checkIsClinicExist: async (req,res,next) => {
        try {
            const {name} = req.body;

            const clinic = await clinicServices.getOneClinic({name});

            if (clinic) {
                throw new Error('Clinic with this name is already exist')
            }

            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },
    checkIsClinicExist: async (req,res,next) => {
        try {
            const {name} = req.body;

            const clinic = await clinicServices.getOneClinic({name});

            if (clinic) {
                throw new Error('Clinic with this name is already exist')
            }

            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
