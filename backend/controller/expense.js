
const { toInteger } = require('lodash');
const Expense = require('../model/expense');
let User = require('../model/model');
const sequelize = require('../utils/DataBase');




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

exports.allExpense = async (req, res, next) => {
  let Id = req.user.id;
  let index = req.header('index')
  let skip = 5;
  let total = await Expense.findAll({ where: { userId: Id } })
  if (total.length >= index * skip) {
  Expense.findAll({
    where: { userId: Id },
    offset: index * skip,
    limit: 5
  })
    .then(result => {
      // console.log(result)
      res.status(200).json({ data: result, prime: req.user.isPrime })
    })
    .catch(err => console.log(err))
  }
  else {
  res.status(201).json({ msg: 'no data found', prime: req.user.isPrime })
  }

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

