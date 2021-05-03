const {specialityServices, doctorServices, clinicServices} = require('../services');

const takeServiceIds = async (doctorArr) => {
    const whichSpecialitiesProvides = [];

    for (const doctor of doctorArr) {
        const serviceId = await specialityServices.getDoctorsSpecialities({ doctor_id: doctor.dataValues.id });

        await whichSpecialitiesProvides.push(serviceId);
    }
    return whichSpecialitiesProvides;
}

const takeClinicIds = async (doctorArrID) => {
    const doctorClinics = [];

    for (const {dataValues} of doctorArrID) {
        const clinicAndDoctorId = await doctorServices.getDoctorsClinic({ id: dataValues.doctor_id });

        await doctorClinics.push(clinicAndDoctorId);
    }

    return doctorClinics;
};

const takeDoctorIds = async (clinicArrID) => {
    const clinicsDoctors = [];
    for (const {dataValues} of clinicArrID) {
        const clinicAndDoctorId = await doctorServices.getDoctorsClinic({ id: dataValues.clinic_id });

        await clinicsDoctors.push(clinicAndDoctorId);
    }

    return clinicsDoctors;
};

const getSpecialities = async (normalServiceIds) => {
    const serviceArr = new Set();

    for (const { dataValues: {service_id} } of normalServiceIds) {

        const {speciality} = await specialityServices.getOneSpeciality({ id: service_id });

        serviceArr.add(speciality);
    }
    return Array.from(serviceArr);
};

const getClinicsByDoctors = async (normalServiceIds) => {
    const serviceArr = [];

    for (const { dataValues: {clinic_id} } of normalServiceIds) {

        const { name } = await clinicServices.getOneClinic({ id:clinic_id });

        await serviceArr.push(name);
    }
    return serviceArr;
};

const getDoctorsById = async (doctorIds) => {
    const doctorArr = [];

    for (const { dataValues: {doctor_id} } of doctorIds) {
        const {dataValues} = await doctorServices.getOneDoctor({ id: doctor_id });

        await doctorArr.push(dataValues.name);
    }
    return doctorArr;
};


module.exports = {
    takeServiceIds,
    takeDoctorIds,
    takeClinicIds,
    getSpecialities,
    getClinicsByDoctors,
    getDoctorsById
}
