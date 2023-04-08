
const Expense = require('../model/expense');

exports.newExpense = async (req, res, next) => {
  try {
    description = req.body.description;
    price = req.body.price;
    category = req.body.category;

    let newExpense = await Expense.create({
      Description: description,
      Price: price,
      Category: category
    })
    res.status(200).send(newExpense);

  } catch (err) {
    console.log(err)
  }
}

exports.allExpense = (req, res, next) => {
  Expense.findAll()
    .then(result => res.send(result))
    .catch(err => console.log(err))
}

exports.deleteExpense = async (req, res, next) => {
  try {
    let Id = req.body.id;
    // console.log(Id);

    await Expense.destroy({ where: { id: Id } });
    res.send('item deleted');
  }
  catch (err) {
    console.log(err);
  }
}