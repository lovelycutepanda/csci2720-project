const event = require('./eventhandler.js');
const location = require('./locationhandler.js');
const user = require('./userhandler.js');


const express = require('express');
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

// get event list
app.get('/event', async (req, res) => {
    return event.findAllEvent(req, res);
})

// get location list
app.get('/location', async (req, res) => {
    return location.findAllLocation(req, res);
})

// get user list
app.get('/user/findall', async (req, res) => {
    return user.findAllUser(req, res);
})

// get single user info or log in request
app.post('/user/findone', async (req, res) => {
    return user.findUser(req, res);
})

// create user request
app.post('/user/create', async (req, res) => {
    return user.create(req, res);
})

// update user request
app.post('/user/update', async (req, res) => {
    return user.update(req, res);
})
    
// handle ALL requests
app.all('/*', (req, res) => {
    let dataObject = {
        login: "panda",
        password: "1234"
    }
    res.json(dataObject);
});


// listen to port 4000
const server = app.listen(4000);
