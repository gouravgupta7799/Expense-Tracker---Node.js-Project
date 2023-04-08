
const { where } = require('sequelize');
const User = require('../model/model');

exports.addNewUser = async (req, res, next) => {
  let checkem = req.body.email;
  let checkpass = req.body.password;
  try {
    let foundEmail = await User.findOne({ where: { userEmail: checkem } });
    if (foundEmail) {
      return res.send('user alredy exixt email found');
    }
    let foundPas = await User.findOne({ where: { userPassword: checkpass } });
    if (foundPas) {
      return res.send('user alredy exixt change password');
    }
    else {
      // console.log(req.body.name, req.body.email, req.body.contect, req.body.password)
      let user = await User.create({
        userName: req.body.name,
        userEmail: req.body.email,
        userContect: req.body.contect,
        userPassword: req.body.password
      })
      res.status(200).send(user);
    }
  }
  catch (err) {
    console.log(err)
  }
}

let attempt = 3;
exports.accessUser = async (req, res, next) => {
  let checkem = req.body.email;
  let checkpass = req.body.password;

  try {
    let foundEmail = await User.findOne({ where: { userEmail: checkem } });

    if (!foundEmail) {
      return res.status(404).send('user not exist')
    }
    if (foundEmail.userPassword === checkpass) {
      res.status(200).send('login successfully');
    } else {
      attempt -= 1;
      if (attempt <= 0) {
        res.send('invalid credensial, try after sometime');
      } else {
        res.send(`invalid password only ${attempt} attempt left`);
      }
    }
  } catch (err) {
    console.log(err)
  }
}