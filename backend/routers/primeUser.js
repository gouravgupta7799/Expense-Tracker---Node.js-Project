
const express = require('express');
const router = express.Router();
const controller = require('../controller/primeUser')
const middle = require('../middleware/auth');


router.use('/primeUser', middle.authorizerUser, controller.leadBoardFeatures)


module.exports = router;