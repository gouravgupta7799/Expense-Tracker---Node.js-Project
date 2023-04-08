
const express = require('express');
const router = express.Router();
const controller = require('../controller/expense');


router.post('/', controller.newExpense);
router.get('/', controller.allExpense);
router.delete('/', controller.deleteExpense);

module.exports = router;