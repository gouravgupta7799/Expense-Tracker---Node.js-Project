
const { toInteger } = require('lodash');
const Expense = require('../model/expense');
let User = require('../model/model')

exports.newExpense = async (req, res, next) => {
  try {
    let description = req.body.description;
    let price = req.body.price;
    let category = req.body.category;

    let newExpense = await Expense.create({
      Description: description,
      Price: price,
      Category: category,
      userId: req.user.id,
    })
    let user = await User.findOne({ where: { id: req.user.id } })
    user.totalExpense = toInteger(price) + user.totalExpense
    user.save()

    res.status(200).send(newExpense);

  } catch (err) {
    console.log(err)
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
  try {
    let Id = req.body.id;
    let userId = req.user.id;
    // console.log(Id);
    // console.log(userId);

    let exp = await Expense.findOne({ where: { id: Id, userId: userId } });

    let user = await User.findOne({ where: { id: req.user.id } })
    user.totalExpense = user.totalExpense - exp.Price
    user.save()
    exp.destroy()

    res.send('item deleted');
  }
  catch (err) {
    console.log(err);
  }
}


exports.updateExpense = async (req, res, next) => {
  try {
    let Id = req.body.id;
    let userId = req.user.id;
    // console.log(Id)
    let exp = await Expense.findOne({ where: { id: Id, userId: userId } });
    let user = await User.findOne({ where: { id: req.user.id } })

    await Expense.update(
      {
        Description: req.body.description,
        Price: req.body.price,
        Category: req.body.category,
      },
      { where: { id: Id, userId: userId } });

    user.totalExpense = (user.totalExpense - exp.Price) + toInteger(req.body.price)
    user.save()
    res.send('item updeted');
  }
  catch (err) {
    console.log(err);
  }
}