const router = require('express').Router();

const { authController, clinicController, doctorController, specialityController } = require('../controllers');
const { adminMiddleware } = require('../middlewares');

router.route('/clinics')
    .post(adminMiddleware.checkIsClinicExist, clinicController.addNewClinic)
    .put(clinicController.updateClinic)
    .get(clinicController.getAllClinics)

router.route('/clinics/:id')
    .get(clinicController.getSingleClinic)
    .post(clinicController.addDoctorToClinic)
    .put()

router.route('/doctors')
    .post(
        adminMiddleware.checkIsDoctorExist,
        doctorController.addNewDoctor
    )
    .get(doctorController.getAllDoctors)

router.route('/doctors/:id')
    .get(doctorController.getSingleDoctor)
    .post(doctorController.addSpecialityToDoctor)
    .put(doctorController.updateDoctor)

router.route('/services')
    .post(
        adminMiddleware.checkIsSpecialityExist,
        specialityController.addNewSpeciality
    )
    .get(specialityController.getAllSpecialities)

module.exports = router;
