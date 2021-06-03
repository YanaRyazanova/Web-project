const express = require('express');
const controller = require('../controllers/authControl.js');
const {check} = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');

const router = express.Router();

router.post('/registration', [
    check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть от 4 до 10 символов").isLength(
        { min: 4, max: 10})
], controller.registration);
router.post('/login', controller.login);

module.exports = router;