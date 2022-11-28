const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
const Schema = mongoose.Schema;

/*
const EventSchema = Schema({
    eventId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    loc: { type: Schema.Types.ObjectId, ref: 'Location' },
    quota: { type: Number }
});
const Event = mongoose.model('Event', EventSchema);

const LocationSchema = Schema({
    locId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    quota: { type: Number }
});
const Location = mongoose.model('Location', LocationSchema);
*/

// Upon connection failure
db.on('error', console.error.bind(console, 'connection error:'));

// Upon successful connection
db.once('open', () => {
    console.log("Connection is open...");
})
    
// handle ALL requests
app.all('/*', (req, res) => {
    // send this to client
    let dataObject = {
        login: "panda",
        password: "1234"
    }
    res.json(dataObject);
});


// listen to port 4000
const server = app.listen(4000);
