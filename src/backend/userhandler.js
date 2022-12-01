const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favourite: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
});
const User = mongoose.model('User', UserSchema);

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
    console.log("username:", username, ", password:", password);

    User.findOne({
        username: username, 
    })
    .select("password")
    .exec(async (err, user) => {
        if (!user)
            return res.json({ err: "User not found." });
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            res.json({ err: "Password is incorrect." });
        else
            res.json({ msg: "Login successful." });
    });

}

module.exports.create = async function (req, res) {
    let { username, password } = req.body;
    console.log("username:", username, ", password:", password);

    const user = await User.findOne({ username: username })

    if (user)
        return res.json({ err: "User already exists." });
    
    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await User.create({
        username: username, 
        password: hashedPassword, 
    }, (err, user) => {
        if (err)
            res.json({ err: err });
        else {
            res.json({ msg: `User ${username} created.` });
        }
    });
}