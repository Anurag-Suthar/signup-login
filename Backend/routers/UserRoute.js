const userController = require('../Controllers/UserControllers')
const express = require('express')
const router = express.Router();


router.post('/signUp', userController.register)
router.post('/signIn', userController.login)

module.exports = router;