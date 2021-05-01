const router = require('express').Router();

const adminRouter = require('./admin.router');
const authRouter = require('./auth.router');

router.use('/admin', adminRouter);
router.use('/auth', authRouter);

module.exports = router;
