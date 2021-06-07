const User = require('../models/User.js');
const Role = require('../models/Role.js');
const MainModel = require('../models/mainModel.js');
const jsonFile = require('jsonfile');
const fs = require('fs');


class bdController
{
    async updateField(req, res) {
        try {
            const { newColumn, defaultValue } = req.body;
            let value = {};
            value[newColumn] = defaultValue;
            let data = fs.readFileSync('./models/mainModelStrict.json');
            let mainModelStructure = JSON.parse(data);
            mainModelStructure[newColumn] = defaultValue;
            let newStrict = JSON.stringify(mainModelStructure);
            fs.writeFile('./models/mainModelStrict.json', newStrict, err => {
                if(err) throw err;
            });
            await MainModel.updateMany({},
                [ {$set : value } ],
                { strict: true });
            res.status(200).redirect('/table');
        } catch (e) {
            console.log(e);
            res.status(403).json({message: "Не удалось выполнить изменение", error: e});
        }
    }

    async addObject(req, res) {
        try {
            const { newUser } = req.body;
            let data = fs.readFileSync('./models/mainModelStrict.json');
            let newFields = JSON.parse(data);
            const newRow = new MainModel({"name" : newUser });
            await newRow.save();
            await MainModel.updateOne({ "name": newUser },
                [ { $set: newFields } ]);
            res.status(200).redirect('/table');
        } catch (e) {
            console.log(e);
            res.status(403).json({message: "Не удалось выполнить изменение", error: e});
        }
    }

    async changeFieldValue(req, res) {
        const {id, value, field} = req.body;
        const newField = {};
        newField[field] = value;
        await MainModel.updateOne({_id: id},
            [{$set: newField}]);
        res.status(200).redirect('/table');
    }
}

module.exports = new bdController();