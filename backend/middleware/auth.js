const User = require('../model/model');
const JWT = require('jsonwebtoken');

exports.authorizerUser = (req, res, next) => {
  try {
    let token = req.header('Authorization');

    let userId = JWT.verify(token, process.env.JWT_SECRET);


    User.findByPk(userId.userId)
      .then(use => {
        req.user = use
        next()
      })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ err: err, success: false })
  }
}