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

module.exports.findAllLocation = async function (req, res) {
    Location.find()
    .select("locationId name position eventList comment")
    .exec((err, locations) => {
        if (err)
            res.json({ err: err });
        else
            res.json(locations);
    })
}