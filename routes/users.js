const express = require("express");
const router = express.Router();

const userController = require("../controllers/users.controller");

router.get('/', userController.getUsers)
router.post('/', userController.signUp)
router.post('/login', userController.login)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router;
