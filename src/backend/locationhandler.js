const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = require('./userhandler.js');

const LocationSchema = Schema({
    locationId: { type: Number, required: true, unique: true },
    name: { type: String },
    position: { longitude: Number, latitude: Number },
    eventList: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    comment: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, message: String}]
});
const Location = mongoose.model('Location', LocationSchema);

module.exports.Location = Location;

module.exports.findAllLocation = async function (req, res) {
    Location.find()
    .select("locationId name position eventList comment")
    .populate({ path: "eventList" , select: "eventId" })
    .populate({ path: "comment.user" , select: "username" })
    .exec((err, locations) => {
        if (err)
            res.json({ err: err });
        else
            res.json(locations);
    })
}

module.exports.findLocation = async function (req, res) {
    const { locationId } = req.body;

    Location.findOne({ locationId: locationId, })
    .select("name position")
    .exec(async (err, location) => {
        if (!location)
            return res.json({ err: "Location not found." });

        res.json({
            locationId: locationId,
            name: location.name,
            longitude: location.position.longitude,
            latitude: location.position.latitude
        });
    });

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
            res.json({ err: "Some error has occured. Please check if input are correct." });
        else {
            res.json({ msg: `Location ${locationId} created.` });
        }
    });
}

module.exports.update = async function (req, res) {
    const { locationId, newLocationId, newName, newLongitude, newLatitude } = req.body;

    const location = await Location.findOne({ locationId: locationId })

    location.locationId = newLocationId;
    location.name = newName;
    location.position = {
        longitude: newLongitude,
        latitude: newLatitude
    }
    location.save();
    res.json({ msg: `Location ${newLocationId} updated.` });
}

module.exports.delete = async function (req, res) {
    const { locationId } = req.body;

    Location.deleteOne({ locationId: locationId }, (err, location) => {
        if (location.deletedCount === 0)
            res.json({ err: "Location not found."});
        else {
            res.json({ msg: `Location ${locationId} deleted.`});
        }
    });
}

module.exports.getObjectId = async function (locationId) {
    const location = await Location.findOne({ locationId: locationId });
    return location._id;
}

module.exports.uploadComment = async function (req, res) {

    const locationId = req.params['locationId'];

    const userId = await user.getObjectId(req.body['newComment'].user);
    
    const location = await Location.findOne({locationId: locationId});

    location.comment.push({
        user: userId,
        message: req.body['newComment'].message 
    });
    location.save();
    res.json({msg: "Comment uploaded successfully."});
}

module.exports.getComment = async function (req, res) {

    const { locationId } = req.body;
    
    Location.findOne({ locationId: locationId })
    .select("comment")
    .populate({ path: "comment.user" , select: "username" })
    .exec((err, location) => {
        res.json(location.comment);
    })
}

module.exports.uploadEventList = async function (locationId, eventList) {
    const location = await Location.findOne({ locationId: locationId });
    location.eventList = eventList;
    location.save();
}
