const event = require('./eventhandler.js');
const location = require('./locationhandler.js');
const user = require('./userhandler.js');


const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;

// Upon connection failure
db.on('error', console.error.bind(console, 'connection error:'));

// Upon successful connection
db.once('open', () => {
    console.log("Connection is open...");
})

app.use(express.static('build'));

// get event list
app.get('/api/event', async (req, res) => {
    return event.findAllEvent(req, res);
})

// create event
app.post('/api/event/create', async (req, res) => {
    return event.create(req, res);
})

// find one event
app.post('/api/event/findone', async (req, res) => {
    return event.findOne(req, res);
})

// update event
app.put('/api/event/update', async (req, res) => {
    return event.update(req, res);
})

// delete event
app.delete('/api/event/delete', async (req, res) => {
    return event.delete(req, res);
})

// get location list
app.get('/api/location/findall', async (req, res) => {
    return location.findAllLocation(req, res);
})

// get single location info
app.post('/api/location/findone', async (req, res) => {
    return location.findLocation(req, res);
})

// create location request
app.post('/api/location/create', async (req, res) => {
    return location.create(req, res);
})

// update location request
app.put('/api/location/update', async (req, res) => {
    return location.update(req, res);
})

// delete location request
app.delete('/api/location/delete', async (req, res) => {
    return location.delete(req, res);
})

// get user list
app.get('/api/user/findall', async (req, res) => {
    return user.findAllUser(req, res);
})

// get single user info or log in request
app.post('/api/user/findone', async (req, res) => {
    return user.findUser(req, res);
})

// create user request
app.post('/api/user/create', async (req, res) => {
    return user.create(req, res);
})

// update user request
app.put('/api/user/update', async (req, res) => {
    return user.update(req, res);
})

// delete user request
app.delete('/api/user/delete', async (req, res) => {
    return user.delete(req, res);
})

// create/update online event data
app.post('/api/event/uploadonlineevent', async (req, res) => {
    return event.uploadOnlineEvent(req, res);
})

// load location comments
app.get('/api/user/location/:locationId', async(req, res) => {
    res.send('hi')
})

// update location comment
app.post('/api/user/location/:locationId', async(req, res) => {
    return location.uploadComment(req,res);
})

// user add favourite location request
app.put('/api/user/addfavourite', async (req, res) => {
    return user.addFavourite(req, res);
})

app.post('/api/location/getcomment', async (req, res) => {
    return location.getComment(req, res);
})

app.get('/*', (req, res) => {
    const link = path.join(path.dirname(path.dirname(__dirname)), 'build', 'index.html');
    res.sendFile(link);
});

// listen to port 80
app.listen(80);
