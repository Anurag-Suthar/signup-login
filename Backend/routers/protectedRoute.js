const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/authMiddlewares');
const { redirectPage } = require('../Controllers/UserControllers');



router.get('/', verifyToken, redirectPage)


module.exports = router