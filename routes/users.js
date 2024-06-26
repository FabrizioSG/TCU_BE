const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");
const transactionController = require("../controllers/transactions.controller");
const planDeudaController = require("../controllers/planDeuda.controller");
const razonesController = require("../controllers/razones.controller");

router.get('/', userController.getUsers)
router.post('/', userController.signUp)
router.post('/login', userController.login)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

router.post("/resetPassword", userController.resetPassword);

router.get('/transactions/:id', transactionController.getTransactionsFromUser);
router.post('/transactions', transactionController.createTransaction);

router.get('/deudas/:id', planDeudaController.getPlanDeudasFromUser);
router.post('/deudas', planDeudaController.createPlanDeuda);

router.get('razones/:id', razonesController.getRazonessFromUser);
router.post('/razones', razonesController.createRazones);

module.exports = router;
