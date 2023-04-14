
const { toInteger } = require('lodash');
const Expense = require('../model/expense');
let User = require('../model/model');
const sequelize = require('../utils/DataBase');
const { UploadImageModel } = require('sib-api-v3-sdk');
const AWS = require('aws-sdk');
const Downloaded = require('../model/downloaded');
const { response } = require('express');


exports.newExpense = async (req, res, next) => {
  let t = await sequelize.transaction();
  try {
    let description = req.body.description;
    let price = req.body.price;
    let category = req.body.category;

    let newExpense = await Expense.create({
      Description: description,
      Price: price,
      Category: category,
      userId: req.user.id,
    }, { transaction: t })
    try {
      let user = await User.findOne({
        where: { id: req.user.id },
        transaction: t,
      })
      user.totalExpense = toInteger(price) + user.totalExpense
      user.save()

      await t.commit();
    } catch (err) {
      console.log(err)
      t.rollback()
    }
    res.status(200).send(newExpense);

  } catch (err) {
    console.log(err)
    t.rollback()
  }
}

exports.allExpense = (req, res, next) => {
  let Id = req.user.id;
  // console.log(req)
  Expense.findAll({ where: { userId: Id } })
    .then(result => {
      // console.log(result)
      res.json({ data: result, prime: req.user.isPrime })
    })
    .catch(err => console.log(err))
}

exports.deleteExpense = async (req, res, next) => {
  let t = await sequelize.transaction();
  try {
    let Id = req.body.id;
    let userId = req.user.id;
    // console.log(Id);
    // console.log(userId);

    let exp = await Expense.findOne({
      where: { id: Id, userId: userId },
      transaction: t
    });
    try {
      let user = await User.findOne({
        where: { id: req.user.id },
        transaction: t
      })
      user.totalExpense = user.totalExpense - exp.Price;
      user.save();
      exp.destroy();

      await t.commit();
      res.send('item deleted');
    }
    catch (err) {
      console.log(err);
      t.rollback();
    }
  }
  catch (err) {
    console.log(err);
    t.rollback()
  }
}


exports.updateExpense = async (req, res, next) => {
  let t = await sequelize.transaction();
  try {
    let Id = req.body.id;
    let userId = req.user.id;
    // console.log(Id)
    let exp = await Expense.findOne({
      where: { id: Id, userId: userId },
      transaction: t
    });
    let user = await User.findOne({
      where: { id: req.user.id },
      transaction: t
    })
    try {
      await Expense.update(
        {
          Description: req.body.description,
          Price: req.body.price,
          Category: req.body.category,
        },
        { where: { id: Id, userId: userId }, transaction: t });

      user.totalExpense = (user.totalExpense - exp.Price) + toInteger(req.body.price);
      user.save();
      await t.commit();
      res.send('item updeted');

    } catch (err) {
      console.log(err);
      t.rollback()
    }
  }
  catch (err) {
    console.log(err);
    t.rollback()
  }
}

function UploadToS3(data, fileName) {

  const BUCKET_NAME = 'expensetrecker'
  const USER_KEY = 'AKIAXQ3PRZKAOOMHOUHH'
  const SECRET_KEY = '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'

  let S3buk = new AWS.S3({
    accessKeyId: USER_KEY,
    secretAccessKey: SECRET_KEY,

  })
  let params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: data,
    ACL: 'public-read'
  }
  return new Promise((resolve, reject) => {
    S3buk.upload(params, (err, responce) => {
      if (err) {
        console.log(err)
        reject(err)
      }
      else {
        resolve(responce.Location)
      }
    })
  })

}

exports.downloadExpense = async (req, res, next) => {
  let allExpenses = await req.user.getExpenses()
  // console.log(allExpenses)
  let stingExpenxe = JSON.stringify(allExpenses);
  const userId = req.user.id;
  let d = new Date()
  let fileName = `expence.txt ${userId}/${d}`;
  let fileUrl = await UploadToS3(stingExpenxe, fileName);
  // console.log(fileUrl)

  await Downloaded.create({
    URL: fileUrl,
    userId: req.user.id
  })

  res.status(200).json({ fileUrl, success: true })
}


exports.downloadedHistory = (req, res, next) => {
  Downloaded.findAll({ where: { userId: req.user.id } })
    .then(response => {
      res.json({ response })
    })
}