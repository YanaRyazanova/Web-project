const User = require('../models/User.js');
const Role = require('../models/Role.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
//const { secretKey } = require('../.env');
const secretKey = process.env.secretKey;

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secretKey, {expiresIn: '24h'})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                res.status(403).json({ message: "Ошибка при регистрации", errors});
            }
            else {
                const {username, password} = req.body;
                const candidate = await User.findOne({username});
                if (candidate) {
                    res.status(403).json({message: "Пользователем с таким именем уже существует"});
                } else {
                    const hashPassword = bcrypt.hashSync(password, 7);
                    const userRole = new Role({value: ["USER"]});
                    const user = new User({username, password: hashPassword, roles: [userRole.value]});
                    await user.save();
                    const token = generateAccessToken(user._id, user.roles);
                    res.cookie('user', token);
                    return res.json({message: "Пользователь успешно зарегистирован!"});
                }
            }
        }

        catch (e) {
            console.log(e);
            res.status(400).json({ message: "Registration error"});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({ username });
            if (!user) {
                res.status(400).json({ message: "Такого пользователя не обнаружено:("});
            }
            else {
                const validPassword = bcrypt.compareSync(password, user.password);
                if (!validPassword) {
                    res.status(400).json({message: "Упс! Кажется пароль неверный:("});
                } else {
                    const token = generateAccessToken(user._id, user.roles);
                    res.cookie('user', token);
                    return res.send("Cookie Set");
                }
            }
        }
        catch (e) {
            console.log(e);
            res.status(403).json({ message: "Login error"});
        }
    }
}

module.exports = new authController();