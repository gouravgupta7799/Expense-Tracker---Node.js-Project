const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const middle = require('../middleware/auth');


router.post('/signin', controller.addNewUser);
router.post('/login', controller.accessUser);


module.exports = router;