var express = require('express');
const { login, addUser } = require('../controller/userController');
const { validate } = require('express-validation');
const userValidation = require('../validation/users');
var router = express.Router();

/* GET users listing. */
router.post('/login',validate(userValidation.login),login );
router.post('/add',validate(userValidation.adduser),addUser );

module.exports = router;
