
const express = require('express');
const router = express.Router();
const controller = require('../controller/primeUser')
const middle = require('../middleware/auth');


router.use('/primeUser', middle.authorizerUser, controller.leadBoardFeatures);
router.get('/download', middle.authorizerUser, controller.downloadExpense)
router.get('/downloaditems', middle.authorizerUser, controller.downloadedHistory)


module.exports = router;