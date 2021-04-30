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

const getSpecialities = async (normalServiceIds) => {
    const serviceArr = [];
    for (const service of normalServiceIds) {
        const { dataValues: {speciality} } = await specialityServices.getOneSpeciality({ id: service.dataValues.service_id });
        const doctor = await doctorServices.getOneDoctor({id: service.dataValues.doctor_id});
        const allInfo = {...doctor.dataValues, speciality};

        if (serviceArr.includes(allInfo)) {
            return
        }
        await serviceArr.push(allInfo)
    }
    return serviceArr;
};

const takeDoctorIds = async (clinicArrID) => {
    const clinicsDoctors = [];
    for (const clinic of clinicArrID) {
        const clinicAndDoctorId = await doctorServices.getDoctorsClinic({ id: clinic.dataValues.id });

        await clinicsDoctors.push(clinicAndDoctorId)
    }

    return clinicsDoctors;
};



module.exports = {
    takeServiceIds,
    getSpecialities,
    takeDoctorIds
}
