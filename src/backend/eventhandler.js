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
    const { locationId, eventList } = req.body;
    
    const locationObjectId = await location.getObjectId(locationId);

    try {
        const newEventList = await Promise.all(eventList.map(async (e) => {
            const event = await Event.findOne({ eventId: e.eventId });

            if (!event) {
                newEvent = new Event({
                    eventId: e.eventId,
                    title: e.title,
                    description: e.description,
                    venue: locationObjectId,
                    presenter: e.presenter,
                    price: e.price,
                    date: e.date.map((d) => new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6)}`)) 
                });
                newEvent.save();
                return newEvent._id;
            } else {
                event.title = e.title;
                event.description = e.description;
                event.venue = locationObjectId;
                event.presenter = e.presenter;
                event.price = e.pric;
                event.date = e.date.map((d) => new Date(`${d.slice(0,4)}-${d.slice(4,6)}-${d.slice(6)}`));
                event.save();
                return event._id;
            }
        }));

        location.uploadEventList(locationId, newEventList);
        
    } catch (e) {
        return res.json({err: e});
    }
    res.json({msg: "Events uploaded successfully."});
}