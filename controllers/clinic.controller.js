const { errorCodes } = require('../constants');
const { clinicServices, doctorServices, specialityServices } = require('../services');
const { transactionInst } = require('../dataBase/MySQL').getInit();
const {utils} = require('../helpers')
module.exports = {
    addNewClinic: async (req, res) => {
        const transaction = await transactionInst();
        try {
            const { name } = req.body;

            await clinicServices.addClinic({ name }, transaction)
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
            const allClinics = await clinicServices.getAllClinics();
            let array = [];
            for (const singleClinic of allClinics) {
                let clinic = await clinicServices.getOneClinic({ id: singleClinic.dataValues.id }); // info about chosen clinic

                const allDoctorsByClinic = await doctorServices.getDoctorsClinic({ clinic_id: singleClinic.dataValues.id }); // all doctors in clinic

                const doctorId = await utils.takeDoctorIds(allDoctorsByClinic);
                const normalDoctorIds = doctorId.flat(7);

                const serviceId = await utils.takeServiceIds(normalDoctorIds);
                const normalServiceIds = serviceId.flat(7);

                const whichSpecialitiesProvided = await utils.getSpecialities(normalServiceIds);
                const eachObj = {...whichSpecialitiesProvided};

                for (const newObjKey in eachObj) {
                    const newObj = {eachObj}
                    const { speciality } = await eachObj[newObjKey];
                    console.log(newObj);
                    clinic = {...clinic, eachObj}
                    // console.log(finalObj)
                }
                const allClinicsInfo = {
                    clinic
                }
                // console.log(allClinicsInfo)
                await array.push(allClinicsInfo)
            }
            res.json(array)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    getSingleClinic: async (req, res) => {
        try {
            const { params: { id } } = req;

            const clinic = await clinicServices.getOneClinic({ id: +id }); // info about chosen clinic

            const allDoctorsByClinic = await doctorServices.getDoctorsClinic({ clinic_id: +id }); // all doctors in clinic

            const doctorId = await utils.takeDoctorIds(allDoctorsByClinic);
            const normalDoctorIds = doctorId.flat(7);

            const serviceId = await utils.takeServiceIds(normalDoctorIds);
            const normalServiceIds = serviceId.flat(7);

            const allDoctors = await doctorServices.getDoctors();

            const whichSpecialitiesProvided = await utils.getSpecialities(normalServiceIds);

            const whichDoctorsExist = await allDoctors.map(({ dataValues }) => dataValues); // all specialities

            const clinicInfo = {
                clinic,
                whichDoctorsExist,
                whichSpecialitiesProvided
            }; // info to front
            res.json(clinicInfo)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
