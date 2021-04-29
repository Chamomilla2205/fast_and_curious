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



            async function processArray(clinicsDoctors) {
                const whichSpecialitiesProvides = [];
                for (const doctor of clinicsDoctors) {
                    const serviceId = await specialityServices.getDoctorsClinic({ doctor_id: doctor.dataValues.id });

                    await whichSpecialitiesProvides.push(serviceId)

                    // for (const {dataValues: service_id} of serviceId) {
                    //     const { dataValues } = await specialityServices.getOneSpeciality({ id: service_id });
                    //     await whichSpecialitiesProvides.push(dataValues)
                    // }
                }
                // console.log(whichSpecialitiesProvides.flat(4))
                return whichSpecialitiesProvides;
            }
            
            // await clinicsDoctors.map(async ({ dataValues: { id } }) => {
            //     const serviceId = await specialityServices.getDoctorsClinic({ doctor_id: id });
            //     console.log(serviceId)
            //     return  whichSpecialitiesProvides.push(serviceId)
            //     await serviceId.map(async ({ dataValues: { service_id } }) => {
            //         const { dataValues } = await specialityServices.getOneSpeciality({ id: service_id })
            //         return whichSpecialitiesProvides.push(dataValues);
            //     })
            // })

            const whichSpecialities= await processArray(clinicsDoctors);
            const whichSpecialitiesProvides = await whichSpecialities.flat(7)

            const whichDoctorsExist = await allDoctors.map(({ dataValues }) => dataValues); // all specialities


            console.log(whichSpecialitiesProvides)

            console.log('HELLO')
            const clinicInfo = {
                clinic,
                whichDoctorsExist,
                clinicsDoctors,
                // whichSpecialitiesProvides
            }; // info to front
            res.json(clinicInfo)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
