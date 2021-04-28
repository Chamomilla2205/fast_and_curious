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

            const doctor = await doctorServices.getOneDoctor({name})

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

            const allDoctorsByClinic = await doctorServices.getDoctorsClinic({clinic_id: +id});

            const clinicsDoctors = [];

            await allDoctorsByClinic.map(async ({dataValues: { doctor_id }}) => {
                const [doctor] = await doctorServices.getDoctors({id: doctor_id}); // done

                return clinicsDoctors.push(doctor)
            })

            const allDoctors = await doctorServices.getDoctors(); // all doctors


            // const whichSpecialitiesProvides = [];

            const whichSpecialitiesProvides = await clinicsDoctors.map( async ({dataValues}) => {
                const serviceId = await specialityServices.getDoctorsClinic({doctor_id: dataValues.id});
                console.log(serviceId)
                return serviceId; // done
                // console.log(specialityId)
                // const xx = specialityId.map((file) => {
                //     const {dataValues: {speciality}} = specialityServices.getOneSpeciality({ id: dataValues.service_id });
                //
                //     if (specialitiesThatProvided.includes(speciality)) {
                //         return
                //     }
                //     return specialitiesThatProvided.push(speciality)
                //     console.log(specialitiesThatProvided)
                // });
            })
            //
            // const specialityProvided = await spec.map( async (file) => {
            //     const {dataValues} = await specialityServices.getOneSpeciality({id: file});
            //     console.log(dataValues)
            //     return dataValues;
            // })

            // console.log(spec)
            const whichDoctorsExist = await allDoctors.map(({dataValues}) => dataValues); // all specialities
            console.log(whichSpecialitiesProvides);
            const clinicInfo = {clinic, whichDoctorsExist, clinicsDoctors}; // info to front
            res.json(clinicInfo)
        } catch (error) {
            res.status(errorCodes.BAD_REQUEST).json(error.message)
        }
    }
}
