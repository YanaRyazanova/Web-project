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
            await MainModel.updateMany({},
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
            const allField = MainModel.findOne({});
            console.log(allField.username);
            // const newRow = new MainModel({ name: newUser });
            // await newRow.save();
            res.status(200).json('Super!');
        } catch (e) {
            console.log(e);
            res.status(403).json({message: "Не удалось выполнить изменение", error: e});
        }
    }

    async changeFieldValue(req, res) {
        const { id, value, field } = req.body;
        const newField = {};
        newField[field] = value;
        const a = await MainModel.updateOne({ _id: id},
             { $set: newField });
        console.log(a);
        res.redirect('/');
    }
}

module.exports = new bdController();