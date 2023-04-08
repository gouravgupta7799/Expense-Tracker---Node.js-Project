const express = require('express');
const bodyperser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/DataBase.js');
let router = require('./routers/router.js');
let expence = require('./routers/expense.js');

let Expense = require('./model/expense.js');
let User = require('./model/model.js');

const app = express();
app.use(cors());
app.use(bodyperser.json({ extended: false }))


app.use('/user', router);
app.use('/expense', expence);


sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))

app.listen(4000)