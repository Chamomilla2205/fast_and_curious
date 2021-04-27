const router = require('express').Router();

const { authController, clinicController, doctorController, specialityController } = require('../controllers');
const { adminMiddleware } = require('../middlewares');

router.route('/clinics')
    .post(adminMiddleware.checkIsClinicExist, clinicController.addNewClinic)
    .put(clinicController.updateClinic)
    .get(clinicController.getAllClinics)

router.route('/doctors')
    .post(adminMiddleware.checkIsDoctorExist, doctorController.addNewDoctor)
    .put(doctorController.updateDoctor)
    .get(doctorController.getAllDoctors)
router.route('/services')
    .post(adminMiddleware.checkIsSpecialityExist, specialityController.addNewSpeciality)
    .get(specialityController.getAllSpecialities)

module.exports = router;
