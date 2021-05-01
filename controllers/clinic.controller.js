const { errorCodes } = require('../constants');
const { clinicServices, doctorServices, specialityServices } = require('../services');
const { transactionInst } = require('../dataBase/MySQL').getInit();
const { utils } = require('../helpers');

module.exports = {
    addNewClinic: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { name } = req.body;

            await clinicServices.addClinic({ name }, transaction);

            await transaction.commit();
            res.json('Clinic created')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    updateClinic: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { body: { name }, params: { id } } = req;

            // await clinicServices(id, { name }, transaction);

            await transaction.commit();
            res.json('Clinic info changed')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    addDoctorToClinic: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { body: { name }, params: { id } } = req;

            const doctor = await doctorServices.getOneDoctor({ name })

            await clinicServices.addDoctorForClinic({ doctor_id: doctor.id, clinic_id: +id }, transaction);

            await transaction.commit();
            res.json('Doctor added to clinic')
        } catch (error) {
            await transaction.rollback();
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    getAllClinics: async (req, res) => {
        try {
            const { speciality } = req.query;

            const clinics = await clinicServices.getAllClinics();

            let allClinics = [];
            for (const { dataValues } of clinics) {
                const allDoctorsByClinic = await doctorServices.getDoctorsClinic({ clinic_id: dataValues.id }); // all doctors in clinic

                const serviceId = await utils.takeServiceIds(allDoctorsByClinic);
                const normalServiceIds = serviceId.flat(7);

                const whichSpecialitiesProvided = await utils.getSpecialities(normalServiceIds);

                dataValues.providedSpecialities = whichSpecialitiesProvided;

                allClinics.push(dataValues);
            }

            const hospitals = allClinics.filter(({ providedSpecialities }) => providedSpecialities.includes(speciality));

            res.json(hospitals);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    },

    getSingleClinic: async (req, res) => {
        try {
            const { params: { id } } = req;

            const clinic = await clinicServices.getOneClinic({ id: +id }); // info about chosen clinic

            const allDoctors = await doctorServices.getDoctors(); // all doctors

            const whichDoctorsExist = await allDoctors.map(({ dataValues }) => dataValues); // all specialities

            const allDoctorsByClinic = await doctorServices.getDoctorsClinic({ clinic_id: +id }); // all doctors in clinic

            const serviceId = await utils.takeServiceIds(allDoctorsByClinic);
            const normalServiceIds = serviceId.flat(7);

            const whichSpecialitiesProvided = await utils.getSpecialities(normalServiceIds);

            const clinicInfo = {
                clinic,
                whichDoctorsExist,
                whichSpecialitiesProvided
            };

            res.json(clinicInfo);
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message);
        }
    }
}
