const express = require('express');
const bodyperser = require('body-parser');
const cors = require('cors');

const sequelize = require('./utils/DataBase.js');
let router = require('./routers/router.js');

const app = express();
app.use(cors());
app.use(bodyperser.json({ extended: false }))


app.use('/user',router)

sequelize
  // .sync({ force: true })
  .sync()
  .catch(err => console.log(err))

app.listen(4000)