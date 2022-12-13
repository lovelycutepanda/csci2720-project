const e = require('cors');
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
    //res.send({ message: "event" });
    Event.find()
    .select("eventId title venue date description presenter price")
    .populate({path: "venue", select: "name"})
    .exec((err, events) => {
        if (err)
            res.json({err: err})
        else {
            /*
            for (e of events){
                let simplifiedDate = [];
                for (let d in e.date) {
                    if (simplifiedDate.length === 0
                        || simplifiedDate[simplifiedDate.length - 1].slice(4, 6) !== e.date[d].slice(4, 6)
                        || (simplifiedDate[simplifiedDate.length - 1].slice(6).length === 2 && Number(simplifiedDate[simplifiedDate.length - 1].slice(6)) + 1 !== Number(e.date[d].slice(6)))
                        || (simplifiedDate[simplifiedDate.length - 1].slice(6).length === 4 && Number(simplifiedDate[simplifiedDate.length - 1].slice(9)) + 1 !== Number(e.date[d].slice(6)))) {
                        /* This matches 4 cases:
                        (1) No elements in simplifiedDate 
                        (2) New element's (d) month does not match that of last element
                        (3) Last element's date is not a range (i.e. not xx~yy) and the new date (d) is not the next day
                            e.g. last element is 20220708 then d is 20220710
                        (4) Last element's date is a range (i.e. xx~yy) and the new date (d) is not the next day
                            e.g. last element is 20220708~10 (i.e. 08~10/07/2022), then d is 20220712
                        Any of these 4 cases results in a new element in simplifiedDate
                        
                        simplifiedDate.push(e.date[d]);
                    } else {
                        //The remaining case must be the new date (d) is the next day of the last element of simplifiedDate
                        if (simplifiedDate[simplifiedDate.length - 1].length === 8) {
                        //date is not a range (i.e. not xx~yy)
                        simplifiedDate[simplifiedDate.length - 1] += '~' + e.date[d].slice(6);
                        //console.log('~' + date[d].slice(6));
                        } else {
                        //date is a range
                        simplifiedDate[simplifiedDate.length - 1] = simplifiedDate[simplifiedDate.length - 1].slice(0, 9) + e.date[d].slice(6);
                        //console.log(simplifiedDate[simplifiedDate.length - 1].slice(0, 9) + date[d].slice(6));
                        }
                        //console.log(simplifiedDate);
                    }
                }
                e.date = simplifiedDate;
            }
            */
            res.json(events);
        }
    })
}

module.exports.create = async function (req, res) {
    const { eventId, title, venue, date, description, presenter, price } = req.body;

    const event = await Event.findOne({eventId: eventId});

    if (event) 
        return res.json({err: "Event already exists."});

    // check if venue exists
    const venue_objectId = await location.getObjectId(venue);

    if (!venue_objectId)
        return res.json({err: "Location does not exist."});
    
    // convert date from string to list of string
    const dateListStr = date.replace(' ', '').split(',');
    const dateList = dateListStr.map((d) => new Date(parseInt(d.slice(0, 4)), parseInt(d.slice(4, 6)) - 1, parseInt(d.slice(6)), 8, 0, 0));

    console.log(dateList);
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
            res.json({msg: `Event ${eventId} successfully created.`});
    })
}

module.exports.update = async function(req, res) {
    
}

module.exports.uploadOnlineEvent = async function (req, res) {
    const { locationId, eventList } = req.body;
    
    const locationObjectId = await Location.getObjectId(locationId);

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
                event.price = e.price;
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