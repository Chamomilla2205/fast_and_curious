const { errorCodes } = require('../constants');
const { clinicServices, doctorServices, specialityServices } = require('../services');
const { transactionInst } = require('../dataBase/MySQL').getInit();
const {utils} = require('../helpers')

module.exports = {
    addNewDoctor: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { name } = req.body;

            await doctorServices.addDoctor({ name }, transaction)
            await transaction.commit();

            res.json('Doctor created')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    updateDoctor: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { boy: { name }, params: { id } } = req;

            await doctorServices.updateDoctor(id, { name }, transaction);

            await transaction.commit();

            res.json('Doctor info changed')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    getAllDoctors: async (req, res) => {
        try {
            const doctors = await doctorServices.getDoctors();

            const serviceId = await utils.takeServiceIds(doctors);
            const normalServiceIds = serviceId.flat(7);

            const whichSpecialitiesProvided = await utils.getSpecialities(normalServiceIds);

            res.json(whichSpecialitiesProvided)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    getSingleDoctor: async (req, res) => {
        try {
            const { params: { id } } = req;

            const doctor = await doctorServices.getOneDoctor({ id: +id });

            const allClinicsByDoctor = await doctorServices.getDoctorsClinic({ doctor_id: +id });
            const doctorsClinics = [];
            await allClinicsByDoctor.map(async ({ dataValues }) => {
                const clinic = await clinicServices.getOneClinic({ id: dataValues.clinic_id })
                return doctorsClinics.push(clinic)
            });

            const allSpecialitiesByDoctor = await specialityServices.getDoctorsSpecialities({doctor_id: +id});
            const doctorsSpecialities = [];
            await allSpecialitiesByDoctor.map(async ({ dataValues }) => {
                const clinic = await specialityServices.getOneSpeciality({ id: dataValues.service_id });

                return doctorsSpecialities.push(clinic)
            });

            const allSpecialities = await specialityServices.getSpecialities();

            const whichServiceExist = await allSpecialities.map(({ dataValues }) => dataValues)

            const doctorInfo = { doctor, whichServiceExist, doctorsClinics, doctorsSpecialities };
            res.json(doctorInfo)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    addSpecialityToDoctor: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { params: { id }, body: { speciality } } = req;

            const {dataValues} = await specialityServices.getOneSpeciality({ speciality });

            await doctorServices.addSpecialityToDoc({ doctor_id: +id, service_id: +dataValues.id }, transaction)

            await transaction.commit();

            res.json('Specialization is added')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}

