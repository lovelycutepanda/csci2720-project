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
    .populate({ path: "eventList" , select: "eventId" })
    .populate({ path: "comment.user" , select: "username" })
    .exec((err, locations) => {
        console.log(locations);
        if (err)
            res.json({ err: err });
        else
            res.json(locations);
    })
}

module.exports.create = async function (req, res) {
    const { locationId, name, longitude, latitude } = req.body;

    const location = await Location.findOne({ locationId: locationId })

    if (location)
        return res.json({ err: "Location already exists." });

    await Location.create({
        locationId: locationId, 
        name: name, 
        position: {
            longitude: longitude,
            latitude: latitude
        }
    }, (err, location) => {
        if (err)
            res.json({ err: err });
        else {
            res.json({ msg: `Location ${locationId} created.` });
        }
    });
}