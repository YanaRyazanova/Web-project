const User = require('../models/User.js');
const Role = require('../models/Role.js');

async function updateField(req, res) {
    try {
        console.log(req.body);
        // const candidate = await User.findOneAndUpdate({ username });
    }
    catch (e) {
        console.log(e);
        res.status(403).json({ message: "Не удалось выполнить изменение", error: e});
    }
}