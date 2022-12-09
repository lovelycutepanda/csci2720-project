const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const location = require('./locationhandler');

const EventSchema = Schema({
    eventId: { type: Number, required: true, unique: true },
    title: { type: String },
    venue: { type: Schema.Types.ObjectId, ref: 'Location' },
    date: [{ type: Date }],
    description: { type: String },
    presenter: { type: String },
    price: { type: String }
});
const Event = mongoose.model('Event', EventSchema);

// example
module.exports.findAllEvent = async function (req, res) {
    res.send({ message: "event" });
}

module.exports.uploadOnlineEvent = async function (req, res) {
    const { locationList } = req.body;
    console.log(locationList);

    locationList.forEach(async (loc) => {
        const locationId = await location.getObjectId(loc.locationId);
        try {
            loc.eventList.forEach((event) => {
                Event.updateOne({ eventId: event.eventId }, {
                    $set: {
                        title: event.title,
                        /*
                        description: event.description,
                        venue: locationId,
                        presenter: event.presenter,
                        price: event.price
                        */
                    }
                }, {
                    upsert: true
                })
            })
        } catch (e) {
            return res.json({err: e});
        }
        res.json({msg: "success"});
    })
}