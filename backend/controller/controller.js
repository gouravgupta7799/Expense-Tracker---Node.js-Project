
const bcrypt = require('bcrypt');
const { where } = require('sequelize');
const User = require('../model/model');

exports.addNewUser = async (req, res, next) => {
  let checkem = req.body.email;
  try {
    let foundEmail = await User.findOne({ where: { userEmail: checkem } });
    if (foundEmail) {
      return res.send('user alredy exixt email found');
    }
    else {
      salt = 5
      bcrypt.hash(req.body.password, salt, async (err, hash) => {

        // console.log(req.body.name, req.body.email, req.body.contect, req.body.password)
        let user = await User.create({
          userName: req.body.name,
          userEmail: req.body.email,
          userContect: req.body.contect,
          userPassword: hash
        })

        res.status(200).send(user);
      })
    }
  }
  catch (err) {
    console.log(err)
  }
}

let attempt = 3;
exports.accessUser = async (req, res, next) => {

  try {
    let checkem = req.body.email;
    let foundEmail = await User.findOne({ where: { userEmail: checkem } });

    if (!foundEmail) {
      return res.status(404).send('user not exist');
    }
    if (foundEmail) {
      bcrypt.compare(req.body.password, foundEmail.userPassword, async (err, pass) => {
        if (pass) {
          res.status(200).send('login successfully');
        }
        else {
          attempt -= 1;
          if (attempt <= 0) {
            res.status(400).send('invalid credensial, try after sometime');
          } else {
            res.status(400).send(`invalid password only ${attempt} attempt left`);
          }
        }
      })
    }
  } catch (err) {
    console.log(err)
  }
}