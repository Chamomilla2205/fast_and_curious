const {specialityServices, doctorServices, clinicServices} = require('../services')
const {utils} = require('../helpers')
const takeServiceIds = async (doctorArr) => {
    const whichSpecialitiesProvides = [];
    for (const doctor of doctorArr) {
        const serviceId = await specialityServices.getDoctorsSpecialities({ doctor_id: doctor.dataValues.id });

        await whichSpecialitiesProvides.push(serviceId)
    }
    return whichSpecialitiesProvides;
}

const getSpecialitiesForDoctor = async (normalServiceIds) => {
    const serviceArr = [];
    for (const { dataValues: {service_id, doctor_id} } of normalServiceIds) {

        const { dataValues: {speciality} } = await specialityServices.getOneSpeciality({ id: service_id });
        const {dataValues} = await doctorServices.getOneDoctor({id: doctor_id});

        // const allInfo = {...doctor.dataValues, speciality};

        // if (!serviceArr.includes({ speciality })) {
        //     return
        // }
        await serviceArr.push(speciality)
    }
    return serviceArr;
};

const takeDoctorIds = async (clinicArrID) => {
    const clinicsDoctors = [];
    for (const {dataValues} of clinicArrID) {
        const clinicAndDoctorId = await doctorServices.getDoctorsClinic({ id: dataValues.clinic_id });

        await clinicsDoctors.push(clinicAndDoctorId)
    }

    return clinicsDoctors;
};

const getSpecialitiesForClinic = async (normalServiceIds, id) => {
    const doctor = await doctorServices.getOneDoctor({id});
    console.log(doctor)
    const serviceArr = [];
    for (const { dataValues: {service_id} } of normalServiceIds) {

        const { dataValues: {speciality} } = await specialityServices.getOneSpeciality({ id: service_id });

        await serviceArr.push(speciality);
    }
    return serviceArr;
};



module.exports = {
    takeServiceIds,
    getSpecialitiesForDoctor,
    takeDoctorIds,
    getSpecialitiesForClinic
}
