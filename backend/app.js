const express = require('express');
const bodyperser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/DataBase.js');
let router = require('./routers/router.js');
let expence = require('./routers/expense.js');
let prime = require('./routers/purches.js');
let primeUser = require('./routers/primeUser.js')
const forgetPassword = require('./routers/forgetPassword.js')
const ForgotPasswordRequest = require('./model/forgetPassword.js')

let Expense = require('./model/expense.js');
let User = require('./model/model.js');
let order = require('./model/order.js');
const Order = require('./model/order.js');

const app = express();
app.use(cors());
app.use(bodyperser.json({ extended: false }))


app.use('/user', router);
app.use('/expense', expence);
app.use('/primemember', prime);
app.use('/prime', primeUser);
app.use('/password', forgetPassword);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
order.belongsTo(User);

User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);


sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))

app.listen(4000)