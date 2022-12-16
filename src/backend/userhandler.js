/*
 * Group members:
 * Tam King Man 1155160072
 * Ku Nok Tik 1155143829
 * Tung Yuen Lok 1155143226
 * Lai Cheuk Lam 1155159309
 * Wong Wai Chun 1155159536
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const location = require('./locationhandler.js');

const UserSchema = Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favourite: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
});
const User = mongoose.model('User', UserSchema);

module.exports.findAllUser = async function (req, res) {
    User.find({ username: { $ne: "admin" } })
    .select("username password favourite")
    .populate({ path: "favourite" , select: "locationId" })
    .exec((err, users) => {
        if (err)
            res.json({ err: err });
        else
            res.json(users);
    })
}

module.exports.findUser = async function (req, res) {
    const { username, password } = req.body;

    User.findOne({ username: username })
    .select("username password favourite")
    .populate({ path: "favourite" , select: "locationId" })
    .exec(async (err, user) => {
        if (!user)
            return res.json({ err: "User not found." });

        // for create user, no password
        if (!password)
            return res.json(user);

        // for log in, have password
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            res.json({ err: "Password is incorrect." });
        else
            res.json({ msg: "Login successful." });
    });

}

module.exports.create = async function (req, res) {
    const { username, password } = req.body;

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
            res.json({ err: "Some error has occured. Please check if input are correct." });
        else {
            res.json({ msg: `User ${username} created.` });
        }
    });
}

module.exports.update = async function (req, res) {
    const { username, newUsername, newPassword } = req.body;

    const user = await User.findOne({ username: username })

    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.username = newUsername;
    user.password = hashedPassword;
    user.save();
    res.json({ msg: `User ${newUsername} updated.` });
}

module.exports.delete = async function (req, res) {
    const { username } = req.body;

    User.deleteOne({ username: username }, (err, user) => {
        if (user.deletedCount === 0)
            res.json({ err: "User not found."});
        else {
            res.json({ msg: `User ${username} deleted.`});
        }
    });
}

module.exports.getObjectId = async function (username) {
    const user = await User.findOne({ username: username })
    return user._id;
}

module.exports.addFavourite = async function (req, res) {
    const { username, locationId } = req.body;
    
    const locationObjectId = await location.getObjectId(locationId);

    const user = await User.findOne({ username: username })

    if (user.favourite.indexOf(locationObjectId) !== -1)
        user.favourite.splice(user.favourite.indexOf(locationObjectId), 1);
    else
        user.favourite.push(locationObjectId);
    user.save();
    res.json({ msg: `Location added to/removed from favourite.` });
}