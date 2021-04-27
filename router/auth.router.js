const router = require('express').Router();

const {controller} = require('../controller');
const {middleware} = require('../middleware');

router.post('/', adminController);

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

module.exports = router;
