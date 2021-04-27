const router = require('express').Router();

const { authController, clinicController, doctorController, specialityController } = require('../controllers');
const { adminMiddleware } = require('../middlewares');

router.route('/clinics')
    .post(adminMiddleware.checkIsClinicExist, adminController.addNewClinic)
    .put()
    .get(clinicController.getAllClinics)

router.route('/doctors')
    .post(doctorController.addNewDoctor)
    .put()
    .get(doctorController.getAllDoctors)
router.route('/services')
    .post()
    .put()
    .get()

module.exports = router;
