const router = require('express').Router();

const {authController} = require('../controllers');
const {adminMiddleware, authMiddleware} = require('../middlewares');

router.post('/', authMiddleware.checkUser, authController.enterToAccount );

router.post('/refreshToken', authMiddleware.checkRefreshToken, authController.takeRefresh);

module.exports = router;
