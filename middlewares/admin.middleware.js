const {errorCodes} = require('../constants')
const {clinicServices, doctorServices, specialityServices, adminServices} = require('../services')

module.exports = {
    checkIsClinicExist: async (req,res,next) => {
        try {
            const {name} = req.body;

            const [clinic] = await clinicServices.getAllClinics({name});

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
                throw new Error('Doctor with this name is already exist')
            }

            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },
    checkIsSpecialityExist: async (req,res,next) => {
        try {
            const {speciality} = req.body;

            const service = await specialityServices.getOneSpeciality({speciality});
            if (service) {
                throw new Error('Clinic with this name is already exist')
            }
            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    doctorSpeciality: async (req,res,next) => {
        try {
            const {body: { speciality }} = req;

            const service = await specialityServices.getOneSpeciality({ speciality });

            const doctorSpecialities = await specialityServices.getDoctorsSpecialities({service_id: service.id});
            await doctorSpecialities.filter(({ dataValues }) => {
                if (dataValues.service_id === service.id) {
                    throw new Error('DOCTOR ALREADY HAVE THIS SPECIALIZATION')
                }
            });

            req.profile = service;

            next()
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
