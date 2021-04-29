const { errorCodes } = require('../constants');
const { clinicServices, doctorServices, specialityServices } = require('../services');
const { transactionInst } = require('../dataBase/MySQL').getInit();

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
            const {} = req.body;

            const clinics = await clinicServices.getAllClinics()
            res.json(clinics)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    },

    getSingleClinic: async (req, res) => {
        try {
            const { params: { id } } = req;

            const clinic = await clinicServices.getOneClinic({ id: +id }); // info about chosen clinic

            const allDoctorsByClinic = await doctorServices.getDoctorsClinic({ clinic_id: +id });

            const clinicsDoctors = [];

            await allDoctorsByClinic.map(async ({ dataValues: { doctor_id } }) => {
                const [doctor] = await doctorServices.getDoctors({ id: doctor_id }); // done

                return clinicsDoctors.push(doctor)
            })

            const allDoctors = await doctorServices.getDoctors(); // all doctors

            async function takeServiceIds(clinicsDoctors) {
                const whichSpecialitiesProvides = [];
                for (const doctor of clinicsDoctors) {
                    const serviceId = await specialityServices.getDoctorsClinic({ doctor_id: doctor.dataValues.id });

                    await whichSpecialitiesProvides.push(serviceId)
                }
                return whichSpecialitiesProvides;
            }

            const serviceId = await takeServiceIds(clinicsDoctors);
            const normalServiceIds = await serviceId.flat(7);

            async function getSpecialities(normalServiceIds) {
                const serviceArr = [];
                for (const service of normalServiceIds) {
                    const { dataValues } = await specialityServices.getOneSpeciality({ id: service.dataValues.service_id });
                    if (serviceArr.includes(dataValues)) {
                        return
                    }
                    await serviceArr.push(dataValues)
                    console.log(serviceArr)
                }
                return serviceArr;
            }

            const whichSpecialitiesProvided = await getSpecialities(normalServiceIds);


            const whichDoctorsExist = await allDoctors.map(({ dataValues }) => dataValues); // all specialities

            console.log(whichSpecialitiesProvided)

            const clinicInfo = {
                clinic,
                whichDoctorsExist,
                clinicsDoctors,
                whichSpecialitiesProvided
            }; // info to front
            res.json(clinicInfo)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
