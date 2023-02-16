const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");
const transactionController = require("../controllers/transactions.controller");

router.get('/', userController.getUsers)
router.post('/', userController.signUp)
router.post('/login', userController.login)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

router.get('/transactions/:id', transactionController.getTransactionsFromUser);
router.post('/transactions', transactionController.createTransaction);

module.exports = router;
