const router = require('express').Router();

const { clinicController, doctorController, specialityController } = require('../controllers');
const { adminMiddleware, authMiddleware } = require('../middlewares');

router.route('/clinics')
    .post(
        authMiddleware.checkAccessToken,
        adminMiddleware.checkIsClinicExist,
        clinicController.addNewClinic
    )
    .get(
        authMiddleware.checkAccessToken,
        clinicController.getAllClinics
    )

router.route('/clinics/:id')
    .get(
        authMiddleware.checkAccessToken,
        clinicController.getSingleClinic
    )
    .post(
        authMiddleware.checkAccessToken,
        clinicController.addDoctorToClinic
    )

router.route('/doctors')
    .post(
        authMiddleware.checkAccessToken,
        adminMiddleware.checkIsDoctorExist,
        doctorController.addNewDoctor
    )
    .get(
        authMiddleware.checkAccessToken,
        doctorController.getAllDoctors
    )

router.route('/doctors/:id')
    .get(
        authMiddleware.checkAccessToken,
        doctorController.getSingleDoctor
    )
    .post(
        authMiddleware.checkAccessToken,
        adminMiddleware.doctorSpeciality,
        doctorController.addSpecialityToDoctor
    )
    .put(
        authMiddleware.checkAccessToken,
        doctorController.updateDoctor
    )

router.route('/services')
    .post(
        authMiddleware.checkAccessToken,
        adminMiddleware.checkIsSpecialityExist,
        specialityController.addNewSpeciality
    )
    .get(
        authMiddleware.checkAccessToken,
        specialityController.getAllSpecialities
    )

module.exports = router;
