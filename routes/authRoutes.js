const express = require('express');
const controller = require('../controllers/authControl.js');
const {check} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');
const bodyParser = require("body-parser");

const router = express.Router();
let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/registration', [
    jsonParser,
    urlencodedParser,
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть от 4 до 10 символов").isLength(
        { min: 4, max: 10})
], controller.registration);
router.post('/login', [jsonParser, urlencodedParser], controller.login);

module.exports = router;