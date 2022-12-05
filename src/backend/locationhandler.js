const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = Schema({
    locationId: { type: Number, required: true, unique: true },
    name: { type: String },
    position: { longitude: Number, latitude: Number },
    eventList: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    comment: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, text: String}]
});
const Location = mongoose.model('Location', LocationSchema);

// example
module.exports.findAllLocation = async function (req, res) {
    res.send({ message: "location" });
}