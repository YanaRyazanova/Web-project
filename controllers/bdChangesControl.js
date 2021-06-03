const User = require('../models/User.js');
const Role = require('../models/Role.js');
const MainModel = require('../models/mainModel.js');


class bdController
{
    async updateField(req, res) {
        try {
            const { newColumn, defaultValue } = req.body;
            let value = {};
            value[newColumn] = defaultValue;
            const res_ = await MainModel.updateMany({},
                [ {$set : value } ]);
            res.status(200).json('Success!');
        } catch (e) {
            console.log(e);
            res.status(403).json({message: "Не удалось выполнить изменение", error: e});
        }
    }

    async addObject(req, res) {
        try {
            const { newUser } = req.body;
            const newRow = new MainModel({ name: newUser });
            await newRow.save();
            res.status(200).json('Super!');
        } catch (e) {
            console.log(e);
            res.status(403).json({message: "Не удалось выполнить изменение", error: e});
        }
    }
}

module.exports = new bdController();