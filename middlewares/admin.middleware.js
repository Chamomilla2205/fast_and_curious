const {errorCodes} = require('../constants')
const {clinicServices, doctorServices, specialityServices} = require('../services')

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
    checkIsDoctorExist: async (req,res,next) => {
        try {
            const {name} = req.body;

            const doctor = await doctorServices.getOneDoctor({name});

            if (doctor) {
                throw new Error('Clinic with this name is already exist')
            }

            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },
    checkIsSpecialityExist: async (req,res,next) => {
        try {
            const {name} = req.body;

            const speciality = await specialityServices.getOneSpeciality({name});

            if (speciality) {
                throw new Error('Clinic with this name is already exist')
            }

            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
