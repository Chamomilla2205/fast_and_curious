const router = require('express').Router();

const {controller} = require('../controller');
const {middleware} = require('../middleware');

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

router.use('/:id', middleware.isPresent)

router.delete('/:id', controller.delete);

router.post('/', controller.create);

module.exports = router;
