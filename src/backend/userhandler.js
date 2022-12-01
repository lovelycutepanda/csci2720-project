const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favourite: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
});
const User = mongoose.model('User', UserSchema);

// example
module.exports.findAllUser = async function (req, res) {
    User.find()
    .select("username password favourite")
    .exec((err, users) => {
        if (err)
            return res.send({ message: err });
        res.json(users);
    })
}

module.exports.login = async function (req, res) {
    let { username, password } = req.body;
    console.log("username: ", username, ", password: ", password);
    let obj = {};

    // handle password
    // search in database

    res.json(obj);
}