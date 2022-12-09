const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const location = require('./locationhandler.js');

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

module.exports.create = async function (req, res) {
    const { eventId, title, venue, date, description, presenter, price } = req.body;

    const event = await Event.findOne({eventId: eventId});

    if (event) 
        return res.json({err: "Event already exists."});

    // check if venue exists
    const venue_objectId = await Location.findOne({locationID: venue}, '_id');

    if (!venue_objectId)
        return res.json({err: "Location does not exist."});
    
    // convert date from string to list of string
    const dateList = date.replace(' ', '').split(',');

    // create event
    await Event.create({
        eventId: eventId,
        title: title,
        venue: venue_objectId,
        date: dateList,
        description: description,
        presenter: presenter,
        price: price
    }, (err, e) => {
        if (err) 
            res.json({err: "Some error has occured. Please check if the input is correct."});
        else
            res.json({err: `Event ${eventId} successfully created.`});
    })
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