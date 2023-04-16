let User = require('../model/model')
const sequelize = require('../utils/DataBase');
const AWS = require('aws-sdk');
const Downloaded = require('../model/downloaded');


exports.leadBoardFeatures = async (req, res, next) => {
  try {
    let leaderboardArray = await User.findAll({
      attributes: ['userName', 'totalExpense'],
      order: [
        ['totalExpense', 'DESC']
      ]
    })
    res.json({ leaderboardArray: leaderboardArray })
  }
  catch (err) {
    console.log(err)
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
  let t = await sequelize.transaction();

  try {
    let allExpenses = await req.user.getExpenses({ transaction: t })
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
    }, { transaction: t })

    await t.commit()
    res.status(200).json({ fileUrl, success: true })
  }
  catch (err) {
    await t.rollback()
    console.log(err)
  }
}


exports.downloadedHistory = async (req, res, next) => {
  let t = await sequelize.transaction()
  Downloaded.findAll({ where: { userId: req.user.id }, transaction: t })
    .then(async (response) => {
      await t.commit()
      res.json({ response })
    })
    .catch(async (err) => {
      await t.rollback()
      console.log(err)
    })
}