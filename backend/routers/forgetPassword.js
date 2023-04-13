
const express = require('express');
const router = express.Router();
const controller = require('../controller/forgetPassword')
const auth = require('../middleware/auth')

router.use('/forgotpassword',auth.authorizerUser, controller.forgetPassword);
router.get('/resetPasswordlink/:id', controller.getresetPassword);
router.post('/resetPassword', controller.postresetPassword);


module.exports = router;