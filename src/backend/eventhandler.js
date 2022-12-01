const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = Schema({
    eventId: { type: Number, required: true, unique: true },
    title: { type: String },
    venue: { type: Schema.Types.ObjectId, ref: 'Location' },
    time: { type: Date },
    description: { type: String },
    presenter: { type: String },
    price: [{ type: Number }]
});
const Event = mongoose.model('Event', EventSchema);

// example
module.exports.findAllEvent = async function (req, res) {
    res.send({ message: "event" });
}