
const Expense = require('../model/expense');

exports.newExpense = async (req, res, next) => {
  try {
    let description = req.body.description;
    let price = req.body.price;
    let category = req.body.category;

    let newExpense = await Expense.create({
      Description: description,
      Price: price,
      Category: category,
      userId: req.user.id
    })
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
      res.send(result)
    })
    .catch(err => console.log(err))
}

exports.deleteExpense = async (req, res, next) => {
  try {
    let Id = req.body.id;
    let userId = req.user.id;
    // console.log(Id);
    // console.log(userId);

    await Expense.destroy({ where: { id: Id, userId: userId } });
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
    await Expense.update(
      {
        Description: req.body.description,
        Price: req.body.price,
        Category: req.body.category,
      },
      { where: { id: Id, userId: userId } });
    res.send('item updeted');
  }
  catch (err) {
    console.log(err);
  }
}